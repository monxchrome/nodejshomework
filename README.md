# Project setup


## Start

Installing plugins on `package.json`

Setting the main routes and setting up the database in `app.ts`


- install ESlint!
  eslint cfg in project

## Routes

Installing plugins on `package.json`

setting routes in
```bash 
router/
```

example:
```typescript
import { Router } from "express";

const router = Router();

export const carRouter = router;
```

## Models

Installing plugins on `package.json`

setting models in
```bash 
models/
```

- Types

setting types in
```bash
types/
```

- In model:
```typescript
export const Model = model<IType, ITypeModel>("model", modelSchema);
or
export const Model = model("model", modelSchema);
```

## Validators

Installing plugins on `package.json`

setting validators in
```bash 
validators/
```

## Middlewares

Installing plugins on `package.json`

setting validators in
```bash 
middlewares/
```

- Connect validators to middlewares:
  Middleware:

```typescript
public async isValidUpdate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = CarValidator.update.validate(req.body);

      if (error) {
        next(new ApiError(error.message, 400));
      }

      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }
```

Validator:
```typescript
  private static brand = Joi.string().min(1).max(20).trim();
  private static model = Joi.string().min(1).max(20).trim();
  private static year = Joi.number().min(1990).max(new Date().getFullYear());

  static update = Joi.object({
    brand: this.brand,
    model: this.model,
    year: this.year,
  });
```

- Connect middlewares to routers:

```typescript

router.post("/", carMiddleware.isValidCreate);

router.get(
  "/:carID",
  carMiddleware.isIDValid,
  carMiddleware.getByIdOrThrow,
);

router.put(
  "/:carID",
  carMiddleware.isIDValid,
  carMiddleware.isValidUpdate,
  carMiddleware.getByIdOrThrow,
);

router.delete(
  "/:carID",
  carMiddleware.isIDValid,
  carMiddleware.getByIdOrThrow,
);
```

## Controllers

Installing plugins on `package.json`

setting controllers in
```bash 
controllers/
```

- Connect controller to routers:

Controller:
```typescript
public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICar[]>> {
    try {
      const cars = await carService.getPagination(
        req.query as unknown as IQuery
      );

      return res.json(cars);
    } catch (e) {
      next(e);
    }
  }
```

Router:
```typescript
router.get("/", carController.getAll);
```

## Services

Installing plugins on `package.json`

setting services in
```bash 
services/
```

- Connect services to controllers:

Controller:
```typescript
public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonRes<ICar>>> {
    try {
      const { _id } = req.res.locals.jwtPayload as ITokenPayload;
      const car = await carService.create(req.body, _id);

      return res.status(200).json({
        message: "Car created",
        data: car,
      });
    } catch (e) {
      next(e);
    }
  }
```

Service:
```typescript
public async create(data: ICar, userId: string) {
    try {
      return await Car.create({ ...data, user: new Types.ObjectId(userId) });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`
`DB_URL`
`FRONT_URL`
-
`PASSWORD_SALT`
-
`JWT_ACCESS_SECRET`
`JWT_REFRESH_SECRET`
`JWT_FORGOT_SECRET`
`JWT_ACTIVATE_SECRET`
-
`NO_REPLY_EMAIL`
`NO_REPLY_PASSWORD`
-
`TWILIO_ACCOUNT_SID`
`TWILIO_AUTH_TOKEN`
`TWILIO_SERVICE_SID`
-
`ADMIN_COOKIE_NAME`
`ADMIN_COOKIE_PASSWORD`
`ADMIN_EMAIL`
`ADMIN_PASSWORD`
-