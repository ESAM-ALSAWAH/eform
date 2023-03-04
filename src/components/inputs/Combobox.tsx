/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import { Combobox as CustomeCombobox, Transition } from "@headlessui/react";
import { CompboxProps } from "../../@types";
import { clsx } from "../../utils/clsx";
import { FieldError, FieldValues } from "react-hook-form";
import { Colors } from "../../@types/enums/colors";

const CheckIcon = (CheckColor?: keyof typeof Colors) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
    className="h-5 w-5"
    style={{
      ...(CheckColor && { color: CheckColor }),
    }}
  >
    <path
      fillRule="evenodd"
      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
      clipRule="evenodd"
    ></path>
  </svg>
);
const ChevronUpDownIcon = (
  ArrowColor?: keyof typeof Colors,
  isError?: boolean | FieldError
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
    className={clsx("h-5 w-5 text-gray-400", isError ? "text-red-600" : "")}
    style={{
      ...(ArrowColor && !isError && { color: ArrowColor }),
    }}
  >
    <path
      fillRule="evenodd"
      d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
      clipRule="evenodd"
    ></path>
  </svg>
);

/**
 * @params data is Required typoef  { id: string | null | number, name: string | null | number, unavailable?: boolean }[]
 * @params ActiveBg must be tailwind color ex:bg-[green] bg-blue-400
 * @params ActiveText must be tailwind color ex:text-[green] text-blue-400
 */
export const Combobox = <TFields extends FieldValues = any>({
  data,
  selected,
  displayValue = "name",
  error,
  messageError,
  onChange,
  classNames,
  helperText,
  styles,
  ArrowColor,
  CheckColor,
  ActiveBg,
  ActiveText,
  label,
}: CompboxProps<TFields>) => {
  const [selectedValue, setSelectedValue] = useState(
    selected ? selected : null
  );
  const [query, setQuery] = useState<string>("");
  useEffect(() => {
    if (onChange && selected) onChange(selected);
  }, []);
  const filtered =
    query === ""
      ? data
      : data.filter((item) =>
          item?.name
            ?.toString()
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div
      className={clsx("max-w-[300px] w-full ", classNames?.root)}
      style={styles?.root}
    >
      {label &&
        (typeof label === "string" ? (
          <label
            htmlFor={typeof label === "string" ? label : ""}
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
      <CustomeCombobox
        value={selectedValue}
        onChange={(value) => {
          onChange && value && onChange(value);
          setSelectedValue(value);
        }}
      >
        <div className="relative mb-0">
          <div
            className={clsx(
              "py-1 relative w-full cursor-default overflow-hidden rounded-lg  text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2  sm:text-sm",
              classNames?.input,
              error
                ? "ring-red-500  border ring-1 border-red-500 bg-red-50"
                : "bg-white"
            )}
            style={styles?.input}
          >
            <CustomeCombobox.Input
              id={typeof label === "string" ? label : ""}
              className={clsx(
                "w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 ring-0 outline-none focus:outline-none focus:ring-0 bg-transparent "
                // classNames?.input
              )}
              displayValue={(item: any) => selectedValue && item[displayValue]}
              onChange={(event) => setQuery(event.target.value)}
            />
            <CustomeCombobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              {ChevronUpDownIcon(ArrowColor, error)}
            </CustomeCombobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <CustomeCombobox.Options
              className={clsx(
                "absolute z-40 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
                classNames?.options
              )}
              style={styles?.options}
            >
              {filtered.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filtered.map((item) => (
                  <CustomeCombobox.Option
                    key={item.id}
                    disabled={item.unavailable}
                    className={({ active }) =>
                      `relative z-40  cursor-default select-none py-2 pl-10 pr-4 ${
                        active
                          ? ActiveBg
                            ? `${ActiveBg} text-white`
                            : "bg-teal-600 text-white"
                          : "text-gray-900"
                      } ${classNames?.option}`
                    }
                    style={{
                      ...styles?.option,
                    }}
                    value={item && item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={clsx(
                            `block truncate ${
                              selected ||
                              (selectedValue && selectedValue?.id) === item.id
                                ? "font-medium"
                                : "font-normal"
                            }`,
                            item?.unavailable ? "opacity-75" : "",
                            ActiveText && ActiveText
                          )}
                        >
                          {item?.name}
                        </span>
                        {selected ||
                        (selectedValue && selectedValue?.id) === item.id ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ||
                              (selectedValue && selectedValue?.id) === item.id
                                ? ActiveText
                                  ? ActiveText
                                  : "text-teal-600"
                                : "text-white"
                            }`}
                          >
                            {CheckIcon(CheckColor)}
                          </span>
                        ) : null}
                      </>
                    )}
                  </CustomeCombobox.Option>
                ))
              )}
            </CustomeCombobox.Options>
          </Transition>
        </div>
      </CustomeCombobox>
      {error && (
        <span
          className={clsx("mt-1 text-xs text-red-600", classNames?.error)}
          style={styles?.error}
          id={`${label}-error`}
        >
          {messageError}
        </span>
      )}
      {!error && helperText && (
        <span
          className={clsx("mt-.5 mx-1 text-xs text-gray-600")}
          style={styles?.helperText}
          id={`${label}-helper`}
        >
          {helperText}
        </span>
      )}
    </div>
  );
};
