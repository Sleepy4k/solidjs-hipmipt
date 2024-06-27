import { mergeProps, Show, For } from 'solid-js';
import { createFormControl, IFormControl } from 'solid-forms';

interface ITextErrorProps {
  name: string;
  control: IFormControl<string>;
}

interface ITextInputProps extends ITextErrorProps {
  type?: string;
  disabled?: boolean;
  placeholder?: string;
  class?: string;
}

export function TextInput(_props: ITextInputProps) {
  const props = mergeProps({ control: createFormControl('') }, _props);

  return (
    <div
      classList={{
        'is-invalid': !!props.control.errors,
        'is-touched': props.control.isTouched,
        'is-required': props.control.isRequired,
      }}
    >
      <input
        name={props.name}
        type={props.type || 'text'}
        placeholder={props.placeholder || 'Text...'}
        value={props.control.value}
        onInput={(e) => {
          props.control.setValue(e.currentTarget.value);
        }}
        onBlur={() => props.control.markTouched(true)}
        required={props.control.isRequired}
        disabled={props.disabled}
        class={props.class}
      />
    </div>
  );
}

export function TextError(props: ITextErrorProps) {
  return (
    <Show when={props.control.isTouched && !!props.control.errors}>
      <For each={Object.values(props.control.errors || {})}>
        {(errorMsg) => <small class='ms-1'>{props.name} {errorMsg}</small>}
      </For>
    </Show>
  );
}
