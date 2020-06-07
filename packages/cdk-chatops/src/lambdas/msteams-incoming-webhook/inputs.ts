interface BaseInput {
  id: string;
  title: string;
  isRequired?: boolean;
  value?: string;
}

export interface TextInput extends BaseInput {
  '@type': 'TextInput';
  isMultiline?: boolean;
  maxLength?: number;
}

export interface DateInput extends BaseInput {
  '@type': 'TextInput';
  includeTime?: boolean;
}

export interface MultichoiceInput extends BaseInput {
  '@type': 'MultichoiceInput';
  choices: { display: string; value: string }[];
  isMultiSelect?: boolean;
  style?: 'normal' | 'expanded';
}

export type Input = TextInput | DateInput | MultichoiceInput;
