import React, { useMemo } from "react";
import { InputProps } from "../../@types";
import { clsx } from "../../utils/clsx";

const inputMode = {
  text: "text",
  number: "numeric",
  email: "email",
  tel: "tel",
  url: "url",
  password: "text",
};
export const TextField = ({
  label,
  helperText,
  name,
  error,
  messageError,
  classNames,
  styles,
  forms,
  withArrow,
  variant = "normal",
  type = "text",
  ...restprops
}: InputProps & { withArrow?: boolean }) => {
  const Component = useMemo(() => {
    return {
      normal: (
        <div
          className={clsx(
            "flex flex-col w-fit",
            classNames?.root ? classNames?.root : ""
          )}
        >
          {label &&
            (typeof label === "string" ? (
              <label
                htmlFor={name}
                className={clsx(
                  "block text-sm font-medium text-gray-600 mb-1 capitalize",
                  classNames?.label
                )}
                style={styles?.label}
              >
                {label}
              </label>
            ) : (
              label
            ))}
          <input
            {...restprops}
            type={type}
            inputMode={inputMode[type]}
            name={name}
            style={styles?.input}
            className={clsx(
              "shadow-sm py-2 px-4 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md outline-none  ",
              classNames?.input,
              error
                ? "focus:ring-red-500 focus:border-red-500 border-red-500 bg-red-50"
                : ""
            )}
            aria-invalid={error ? "true" : "false"}
            onKeyPress={(event) => {
              if (
                !/[0-9]/.test(event.key) &&
                (type === "number" || type === "tel")
              ) {
                event.preventDefault();
              }
            }}
            {...forms}
          />
          {error && (
            <span
              className={clsx("mt-1 text-xs text-red-600", classNames?.error)}
              style={styles?.error}
              id={`${name}-error`}
            >
              {messageError}
            </span>
          )}
          {!error && helperText && (
            <span
              className={clsx("mt-.5 mx-1 text-xs text-gray-600")}
              style={styles?.helperText}
              id={`${name}-helper`}
            >
              {helperText}
            </span>
          )}
        </div>
      ),
      standard: (
        <div
          className={clsx(
            "flex flex-col w-fit",
            classNames?.root ? classNames?.root : ""
          )}
        >
          <div className="relative z-0 w-full  group">
            <input
              {...restprops}
              type={type}
              name={name}
              style={styles?.input}
              className={clsx(
                "block py-2.5 px-0 w-full text-sm bg-transparent text-black border-0 border-b-2 border-gray-300 outline-none appearance-none    focus:outline-none focus:ring-0 focus:border-indigo-500  peer ",
                classNames?.input,
                error
                  ? "focus:ring-red-500 focus:border-red-500 border-red-500"
                  : ""
              )}
              placeholder=" "
              aria-invalid={error ? "true" : "false"}
              onKeyPress={(event) => {
                if (
                  !/[0-9]/.test(event.key) &&
                  (type === "number" || type === "tel")
                ) {
                  event.preventDefault();
                }
              }}
              {...forms}
            />
            {label && typeof label === "string" ? (
              <label
                htmlFor={name}
                className={clsx(
                  " font-normal text text-gray-600  absolute capitalize  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7 peer-focus:text-lg peer-empty:text-base ",
                  error ? "text-red-500" : "peer-focus:text-indigo-500",
                  classNames?.label
                )}
              >
                {label}
              </label>
            ) : (
              label
            )}
          </div>

          {error && (
            <span
              className={clsx("mt-1 text-xs text-red-600", classNames?.error)}
              style={styles?.error}
              id={`${name}-error`}
            >
              {messageError}
            </span>
          )}
          {!error && helperText && (
            <span
              className={clsx("mt-.5 mx-1 text-xs text-gray-600")}
              style={styles?.helperText}
              id={`${name}-helper`}
            >
              {helperText}
            </span>
          )}
        </div>
      ),
    } as { [key: string]: JSX.Element };
  }, [classNames?.error, classNames?.input, classNames?.label, classNames?.root, error, forms, helperText, label, messageError, name, restprops, styles?.error, styles?.helperText, styles?.input, styles?.label, type]);
  return <>{Component[variant]}</>;
};
