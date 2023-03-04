import React from 'react'
import { Colors } from './enums/colors'
import { Direction } from './enums/direction';
import { FieldError, FieldValues } from 'react-hook-form'
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string | React.ReactNode
    helperText?: string | React.ReactNode
    name?: string
    error?: boolean | undefined | FieldError
    messageError?: string
    classNames?: {
        root?: string
        input?: string
        label?: string
        error?: string
        helperText?: string
    }
    styles?: {
        root?: React.CSSProperties
        input?: React.CSSProperties
        label?: React.CSSProperties
        error?: React.CSSProperties
        helperText?: React.CSSProperties
    }
    forms?: any
    variant?: 'normal' | 'standard'
    type?: 'text' | 'number' | 'url' | 'email' | 'tel' | 'password'
}


export interface ToggleProps {
    labelPosition?: keyof typeof Direction
    label?: string | React.ReactNode
    helperText?: string | React.ReactNode
    name?: string
    classNames?: {
        root?: string
        input?: string
        label?: string
        helperText?: string
    }
    styles?: {
        root?: React.CSSProperties
        input?: React.CSSProperties
        label?: React.CSSProperties
        helperText?: React.CSSProperties
    }
    onChange?: (value: boolean) => void
    checked?: boolean
    bgColor?: keyof typeof Colors | `bg-${string}`,

    ActiveColor?: keyof typeof Colors | `bg-${string}`
}


export interface CheckboxProps extends Omit<InputProps, 'type' | 'variant'> { }


export interface CompboxProps<TFields extends FieldValues = any> {
    data: { id: string | null | number, name: string | null | number, unavailable?: boolean }[]
    label?: string | React.ReactNode
    displayValue?: 'id' | 'name',
    selected?: { id: string | null | number, name: string | null | number }
    error?: boolean | undefined | FieldError
    messageError?: string
    onChange?: (value: { id: string | null | number, name: string | null | number, unavailable?: boolean }) => void
    classNames?: {
        root?: string
        input?: string
        label?: string
        error?: string
        helperText?: string
        options?: string
        option?: string
    }
    styles?: {
        root?: React.CSSProperties
        input?: React.CSSProperties
        label?: React.CSSProperties
        error?: React.CSSProperties
        helperText?: React.CSSProperties
        options?: React.CSSProperties
        option?: React.CSSProperties
    }
    helperText?: string | React.ReactNode
    ArrowColor?: keyof typeof Colors
    CheckColor?: keyof typeof Colors
    ActiveBg?: `bg-${string}`
    ActiveText?: `text-${string}`
}

