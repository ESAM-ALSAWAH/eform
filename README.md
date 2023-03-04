# Eform

## _Simple, extensible and config based form validation with tailwindcss._

## The problem

You want to write simple and maintainable form validations and make the style for it. As part of this goal, you want your validations to be simple yet accomadate your specifc needs.

## This solution

The `eform` is a very lightweight solution for validating forms. It provides react hooks to configure your form, in a way that encourages simpler way to validate form.

## Installation

This module is distributed via npm which is bundled with node and should be installed as one of your project's dependencies:

```diff
npm install --save @esam_alsawah/eform

yarn add @esam_alsawah/eform
```

`This library has peerDependencies listings for react and react-dom. and tailwind ,  So it must be used tailwindcss and react in your project to benefit from this library`

## Examples

### TextField

```diff
import React from "react";
import {
  Form,
  TextField,
  yup,
  useForm,
  yupResolver,
} from "@esam_alsawah/eform";

interface TFields {
  firstName: string;
}
const schema = yup.object({
  firstName: yup.string().required(),
});
export const App = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<TFields>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
  });
  const onSubmit = (values: any) => console.log(values);
  return (
    <Form className="px-10" handleSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="First Name"
        error={errors.firstName}
        messageError={errors.firstName?.message}
        forms={{ ...register("firstName") }}
      />
      <button
        type="submit"
        className="bg-white shadow rounded-lg py-2 px-4 mt-5"
      >
        submit
      </button>
    </Form>
  );
};

```

### Combobx

```diff
import React from "react";
import { Form, Combobox, yup, useForm, yupResolver } from "@esam_alsawah/eform";

interface TFields {
  combobx: string;
}
const schema = yup.object({
  combobx: yup.string().required(),
});
export const App = () => {
  const {
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<TFields>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
  });
  const onSubmit = (values: any) => console.log(values);
  return (
    <Form className="px-10" handleSubmit={handleSubmit(onSubmit)}>
      <Combobox
        label="Combobx"
        data={[
          { id: 0, name: "esam", unavailable: true },
          { id: 1, name: "alaa" },
          { id: 2, name: "masa" },
        ]}
        error={errors.combobx}
        messageError={errors.combobx?.message}
        helperText="select one of these"
        onChange={(value) =>
          setValue("combobx", value.name ? value?.name?.toString() : "", {
            shouldValidate: true,
          })
        }
      />

      <button
        type="submit"
        className="bg-white shadow rounded-lg py-2 px-4 mt-5"
      >
        submit
      </button>
    </Form>
  );
};

```

### Toggle

```diff
import React from "react";
import { Form, Toggle, yup, useForm } from "@esam_alsawah/eform";

interface TFields {
  toggle: boolean;
}

export const App = () => {
  const { handleSubmit, setValue } = useForm<TFields>({
    reValidateMode: "onChange",
    defaultValues: {
      toggle: false,
    },
  });
  const onSubmit = (values: any) => console.log(values);
  return (
    <Form className="px-10" handleSubmit={handleSubmit(onSubmit)}>
      <Toggle
        label="Toggle"
        name="toggle"
        onChange={(value) => setValue("toggle", value)}
      />

      <button
        type="submit"
        className="bg-white shadow rounded-lg py-2 px-4 mt-5"
      >
        submit
      </button>
    </Form>
  );
};

```
