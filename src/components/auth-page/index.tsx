"use client";
import type { AuthPageProps } from "@refinedev/core";
import { AuthPage as AuthPageBase } from "@refinedev/core";

export const AuthPage = (props: AuthPageProps) => {
  return (
    <div className="max-w-2xl mx-auto p-6 mt-12">
      <h1 className="text-3xl font-bold mb-8">
        {props.type === "login" ? "Login" : "Register"}
      </h1>
      <AuthPageBase
        {...props}
        renderContent={(content) => (
          <div className="space-y-6">
             {/*<div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
             <p className="text-blue-700 text-sm text-center">
                <span className="font-medium">Demo Credentials</span><br />
                email: demo@refine.dev<br />
                password: demodemo
              </p> }
            </div>*/}
            <div className="[&_form]:space-y-6 [&_input]:w-full [&_input]:px-4 [&_input]:py-2 [&_input]:border [&_input]:rounded-lg [&_input:focus]:ring-2 [&_input:focus]:ring-blue-500 [&_input:focus]:border-transparent [&_button]:w-full [&_button]:py-2 [&_button]:px-4 [&_button]:rounded-lg [&_button]:bg-blue-600 [&_button]:text-white [&_button]:font-medium hover:[&_button]:bg-blue-700 [&_label]:block [&_label]:text-sm [&_label]:font-medium [&_label]:mb-2">
              {content}
            </div>
          </div>
        )}
      />
    </div>
  );
};
