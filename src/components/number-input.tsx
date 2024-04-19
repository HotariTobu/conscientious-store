import { ChangeEventHandler, forwardRef, useState } from "react";
import { Input, InputProps } from "./ui/input";
import { z } from "zod";

type Props = Omit<InputProps, "value" | 'defaultValue'> & {
  /** 整数のみを受け入れるならTrue */
  integer?: boolean | undefined;

  value?: number | null | undefined;
  defaultValue?: number | null | undefined;
  minValue?: number | null | undefined;
  maxValue?: number | null | undefined;

  /**
   * 入力値が変更され、その値が正しい数値の文字列であり、指定された範囲内であれば呼ばれる。
   * 渡される数値はNaNでないことが保証される。
   */
  onChangeNumber?: ((value: number) => void) | undefined;

  /**
   * 入力値が変更され、その値が正しい数値の文字列でないか、または指定された範囲外であれば呼ばれる。
   * 渡されるのは入力値
   */
  onInvalidNumber?: ((value: string) => void) | undefined;
};

export type { Props as NumberInputProps };

/**
 * [minValue, maxValue]の範囲の数値の入力を受け入れる。
 * 境界値は正しい範囲に含まれる。
 */
export const NumberInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      integer = false,

      value,
      defaultValue,
      minValue,
      maxValue,
      onChange = () => { },
      onChangeNumber = () => { },
      onInvalidNumber = () => { },

      ...props
    },
    ref
  ) => {
    const initialValue = typeof defaultValue === 'number' ? defaultValue.toString() : ''
    const passedValue = typeof value === 'number' ? value.toString() : initialValue
    const [localValue, setLocalValue] = useState(initialValue);

    const [isValid, setIsValid] = useState(true);

    const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
      onChange(event);
      if (event.defaultPrevented) {
        return;
      }

      const newValue = event.target.value;

      const schema = integer ? z.number().int() : z.number()
      const parsedResult = schema.safeParse(newValue)

      const min = minValue ?? -Infinity;
      const max = maxValue ?? Infinity;

      if (parsedResult.success && min <= parsedResult.data && parsedResult.data <= max) {
        onChangeNumber(parsedResult.data);
        setLocalValue(parsedResult.data.toString());
        setIsValid(true);
      } else {
        onInvalidNumber(newValue);
        setLocalValue(newValue);
        setIsValid(false);
      }
    };

    return (
      <Input
        ref={ref}
        type="text"
        inputMode="numeric"
        value={isValid ? passedValue : localValue}
        onChange={handleChange}
        {...props}
      />
    );
  }
);

NumberInput.displayName = "NumberInput";
