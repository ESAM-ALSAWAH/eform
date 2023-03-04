import { useForm as useFormHook, FieldValues, UseFormProps } from "react-hook-form";

export const useForm = <TFieldValues extends FieldValues, TContext = any>(props?: UseFormProps<TFieldValues, TContext>) => {
    const {
        ...options
    } = useFormHook<TFieldValues>(props);


    return { ...options }

}



