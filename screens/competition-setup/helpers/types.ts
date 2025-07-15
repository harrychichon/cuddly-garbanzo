type BaseField = {
	name: string;
	label: string;
	required?: boolean;
};

type TextField = BaseField & {
	type: 'text';
	defaultValue?: string;
	placeholder?: string;
	maxLength?: number;
};

export type SelectField = BaseField & {
	type: 'select';
	options: Array<{ value: string; label: string }>;
};

type SliderField = BaseField & {
	type: 'slider';
	min: number;
	max: number;
	step: number;
	unit?: string;
};

type NumberField = BaseField & {
	type: 'number';
	min?: number;
	max?: number;
	step?: number;
};

export type FormField = TextField | SelectField | SliderField | NumberField;
