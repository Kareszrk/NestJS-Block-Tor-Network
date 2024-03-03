## Use this decorator only if you don't already have a way to get the user's IP
In your main.ts file import as follows:

```typescript
import * as requestIp from 'request-ip';
```
Place the code in the same location as where your ``main.ts`` is located.

Afterwards to make this accessible in all of your project files where Request object is available, apply it by calling the app.use method in ``main.ts``
```typescript
app.use(requestIp.mw());
```

Access the IP:
```typescript
req.clientIp
```
