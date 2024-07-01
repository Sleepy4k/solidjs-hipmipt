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

const TextInput = (_props: ITextInputProps) => {
  const props = mergeProps({ control: createFormControl('') }, _props);

  return (
    <div
      classList={{
        'is-dirty': props.control.isDirty,
        'is-valid': props.control.isValid,
        'is-clean': !props.control.isDirty,
        'is-invalid': !props.control.isValid,
        'is-touched': props.control.isTouched,
        'is-required': props.control.isRequired,
        'is-untouched': !props.control.isTouched,
      }}
    >
      <input
        name={props.name}
        type={props.type || 'text'}
        placeholder={props.placeholder || 'Text...'}
        value={props.control.value}
        onInput={(e) => {
          props.control.setValue(e.currentTarget.value);
          // check if input not empty
          if (e.currentTarget.value !== '')
            props.control.markDirty(true);
          else
            props.control.markDirty(false);
        }}
        onBlur={() => props.control.markTouched(true)}
        required={props.control.isRequired}
        disabled={props.disabled}
        class={props.class}
      />
    </div>
  );
};

const TextError = (props: ITextErrorProps) => {
  return (
    <Show when={props.control.isTouched && !!props.control.errors}>
      <For each={Object.values(props.control.errors || {})}>
        {(errorMsg) => <small class='ms-1'>{props.name} {errorMsg}</small>}
      </For>
    </Show>
  );
};

export { TextInput, TextError };
