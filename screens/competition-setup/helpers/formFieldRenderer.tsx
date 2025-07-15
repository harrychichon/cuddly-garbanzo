import { MySlider, MyTextInput } from '@/components/';
import { useAppTheme } from '@/hooks';
import { CompetitionFormData } from '@/screens';
import { Control, Controller } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';
import { FormField } from './types';

type FormFieldRendererProps = {
	field: FormField;
	control: Control<CompetitionFormData>;
};

export const FormFieldRenderer = ({
	field,
	control,
}: Readonly<FormFieldRendererProps>) => {
	const { theme } = useAppTheme();
	const key = field.name;

	switch (field.type) {
		case 'text':
			return (
				<Controller
					key={key}
					name={field.name as keyof CompetitionFormData}
					control={control}
					render={({ field: { onChange, value } }) => (
						<MyTextInput
							label={field.label}
							value={value as string}
							onChangeText={onChange}
							defaultValue={field.defaultValue}
							maxLength={field.maxLength}
						/>
					)}
				/>
			);

		case 'select':
			return (
				<View key={key}>
					<Text style={{ color: theme.colors.text }}>{field.label}:</Text>
					{field.options.map((option) => (
						<Controller
							key={`${key}-${option.value}`}
							name={field.name as keyof CompetitionFormData}
							control={control}
							render={({ field: { onChange, value } }) => (
								<>
									{/* 
									// <InputSelect
										option={option}
										value={option.value}
										onPress={() => onChange(option.value)}
									/> */}
									<TouchableOpacity
										onPress={() => onChange(option.value)}
										style={{
											padding: 10,
											backgroundColor:
												value === option.value ? '#ff5845' : '#ffffff',
											margin: 2,
											borderRadius: 5,
										}}>
										<Text
											style={{
												color: value === option.value ? 'white' : 'black',
												fontWeight: value === option.value ? 700 : 400,
											}}>
											{option.label}
										</Text>
									</TouchableOpacity>
								</>
							)}
						/>
					))}
				</View>
			);

		case 'slider':
			return (
				<Controller
					key={key}
					name={field.name as keyof CompetitionFormData}
					control={control}
					render={({ field: { onChange, value } }) => (
						<MySlider
							label={field.label}
							units={field.unit}
							minimumValue={field.min}
							maximumValue={field.max}
							value={value || field.min}
							onValueChange={onChange}
							step={1}
						/>
					)}
				/>
			);

		default:
			return null;
	}
};
