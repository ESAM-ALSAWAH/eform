import React, { useState } from "react";
import { ToggleProps } from "../../@types";
import { clsx } from "../../utils/clsx";
import { Switch } from "@headlessui/react";
import { Colors } from "../../@types/enums/colors";
/**
 * @param ActiveColor this is must be color in tailwindcss or from enums color
 * @param bgColor this is must be color in tailwindcss or from enums color
 *  */
export const Toggle: React.FC<ToggleProps> = ({
  label,
  name,
  classNames,
  styles,
  helperText,
  labelPosition,
  onChange,
  checked = false,
  ActiveColor,
  bgColor,
}) => {
  const [enabled, setEnabled] = useState<boolean>(checked);

  return (
    <div className={clsx("select-none", classNames?.root)} style={styles?.root}>
      <div
        className={clsx(
          labelPosition === "Right"
            ? "flex flex-row-reverse w-fit items-center gap-3 "
            : labelPosition === "Left"
            ? "flex w-fit items-center gap-3"
            : labelPosition === "Down"
            ? "flex flex-col-reverse gap-2"
            : ""
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
        <Switch
          checked={enabled}
          onChange={(value: boolean) => {
            onChange && onChange(value);
            setEnabled(value ? true : false);
          }}
          className={clsx(
            enabled ? ActiveColor ?? "bg-blue-600" : bgColor ?? "bg-gray-200",
            `relative inline-flex h-6 w-11 items-center rounded-full`,
            classNames?.input
          )}
          style={{
            ...styles?.input,
            ...(ActiveColor &&
              Object.keys(Colors).includes(ActiveColor) &&
              enabled && {
                background: ActiveColor,
              }),
            ...(bgColor &&
              Object.keys(Colors).includes(bgColor) &&
              !enabled && {
                background: bgColor,
              }),
          }}
        >
          <span className="sr-only">{label}</span>
          <span
            className={`${
              enabled ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
        {helperText && (
          <span
            className={clsx("mt-.5 mx-1 text-xs text-gray-600")}
            style={styles?.helperText}
            id={`${name}-helper`}
          >
            {helperText}
          </span>
        )}
      </div>
    </div>
  );
};
