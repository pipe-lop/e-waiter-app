import React, { useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import CustomInput from './CustomInput'

const FormCustomInput = React.forwardRef((props, ref) => {
    const {
        name,
        rules,
        validationLength = 1,
        formatter,
        onBlur,
        onValid,
        onChangeHandler,
        label,
        placeholder,
        secureTextEntry,
        editable,
        autoCapitalize,
        ...restOfProps
    } = props
    const {control, formState, trigger, watch } = useFormContext()
    const value = watch(name)

    useEffect(() => {
        async function validate() {
            const isValid = await trigger(name)
            if (isValid) onValid?.()
        }

        if(value?.length >= validationLength){
            validate()
        }
    }, [value, name, validationLength, trigger])

  return (
    <Controller
        control={control}
        render={({field}) => (
            <CustomInput
                {...restOfProps}
                ref={ref}
                name={label}
                placeholder={placeholder}
                value={field.value}
                onChangeHandler={(text) => {
                    const formatted = formatter ? formatter(field.value, text) : text
                    field.onChange(formatted)
                }}
                secureTextEntry={secureTextEntry}
                editable={editable}
                autoCapitalize={autoCapitalize}
            />
        )}
        name={name}
        rules={rules}
    />
  )
})

export default FormCustomInput
