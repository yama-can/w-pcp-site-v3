import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUser } from "../app/components/auth";
import path from "path";
import { NextURL } from "next/dist/server/web/next-url";
import { Permission, isContainPermission } from "@/app/components/permissions";

export default async function middleware(request: NextRequest) {
  let next = false,
    go = false;
  const path = request.nextUrl.pathname;
  for (let i = 0; i < requireLoginUrls.length; i++) {
    if (path.match(requireLoginUrls[i])) {
      next = true;
      break;
    }
  }

  const user = await getUser({
    type: "cookie",
    value: request.headers.get("cookie"),
  });

  if (user) {
    if (
      !isContainPermission(user?.permission, Permission.poster) &&
      (path.startsWith("/dashboard/edit_post") ||
        path.startsWith("/dashboard/create_post") ||
        path.startsWith("/dashboard/delete_post") ||
        path.startsWith("/dashboard/evaluations"))
    ) {
      go = true;
    }

    if (
      !isContainPermission(user.permission, Permission.user_admin) &&
      path.startsWith("/dashboard/management_user")
    ) {
      go = true;
    }
  }

  if (next) {
    if (!user || go) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }
}

const requireLoginUrls = [/^\/dashboard(\/.*)?$/];
