import * as AdminJSMongoose from "@adminjs/mongoose";
import AdminJSExpress from "@adminjs/express";
import AdminJS from "adminjs";
import mongoose from "mongoose";

AdminJS.registerAdapter(AdminJSMongoose);

const adminJS = new AdminJS({
  databases: [mongoose],
  rootPath: "/admin",
});

export const adminRouter = AdminJSExpress.buildRouter(adminJS);
