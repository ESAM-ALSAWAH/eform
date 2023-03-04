import { FieldValues, useWatch as useWatchHooks, Control } from 'react-hook-form'
export const useWatch = ({
    control,
    defaultValue
}: {
    control?: Control<FieldValues>
    defaultValue?: any
}) => {
    return useWatchHooks(
        {
            ...(control && { control }),
            ...(defaultValue && { defaultValue }),
        }
    )
}

