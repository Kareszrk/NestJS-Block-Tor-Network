import { Injectable, NestMiddleware, OnModuleInit } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
// import fetch from 'node-fetch'; -- Optional, in case of your enviorement does not support fetch out of the box

@Injectable()
export class TorBlockMiddleware implements NestMiddleware, OnModuleInit {
  private readonly torBlockFilePath = `${__dirname}/tor-block.txt`;
  private torBlockList: Set<string> = new Set();

  async onModuleInit() {
    try {
      const response = await fetch("https://check.torproject.org/torbulkexitlist?ip=1.1.1.1");

      if (!response.ok) {
        throw new Error("Failed to fetch TOR exit nodes");
      }

      const text = await response.text();
      const torExitNodes = text.split('\n').filter(ip => ip.trim() !== '');

      console.log("TOR Exit Nodes:");
      console.log(torExitNodes);

      // Save the TOR exit nodes to the tor-block.txt file
      fs.writeFileSync(this.torBlockFilePath, torExitNodes.join('\n'));
      console.log(`TOR exit nodes saved to ${this.torBlockFilePath}`);

      // Update the torBlockList
      this.torBlockList = new Set(torExitNodes);
    } catch (error) {
      console.error(error);
      console.log("-- WARNING: This application is not protected against TOR network --");
    }
  }

  use(req: Request, res: Response, next: NextFunction) {
    const userIP = req.clientIp;

    if (this.torBlockList.has(userIP)) {
      res.status(403).send('Access from TOR network is blocked.');
    } else {
      next();
    }
  }
}
