import Slider from '@react-native-community/slider';
import { Control, Controller } from 'react-hook-form';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FormField, TournamentFormData } from '../types';

type FormFieldRendererProps = {
	field: FormField;
	control: Control<TournamentFormData>;
};

export const FormFieldRenderer = ({
	field,
	control,
}: Readonly<FormFieldRendererProps>) => {
	const key = field.name;

	switch (field.type) {
		case 'text':
			return (
				<Controller
					key={key}
					name={field.name as keyof TournamentFormData}
					control={control}
					render={({ field: { onChange, value } }) => (
						<View>
							<Text>{field.label}</Text>
							<TextInput
								value={value}
								onChangeText={onChange}
								placeholder={field.placeholder}
								maxLength={field.maxLength}
							/>
						</View>
					)}
				/>
			);

		case 'select':
			return (
				<View key={key}>
					<Text>{field.label}:</Text>
					{field.options.map((option) => (
						<Controller
							key={`${key}-${option.value}`}
							name={field.name as keyof TournamentFormData}
							control={control}
							render={({ field: { onChange, value } }) => (
								<TouchableOpacity
									onPress={() => onChange(option.value)}
									style={{
										padding: 10,
										backgroundColor:
											value === option.value ? '#007AFF' : '#f0f0f0',
										margin: 2,
										borderRadius: 5,
									}}>
									<Text
										style={{
											color: value === option.value ? 'white' : 'black',
										}}>
										{option.label}
									</Text>
								</TouchableOpacity>
							)}
						/>
					))}
				</View>
			);

		case 'slider':
			return (
				<Controller
					key={key}
					name={field.name as keyof TournamentFormData}
					control={control}
					render={({ field: { onChange, value } }) => (
						<View style={{ margin: 10 }}>
							<Text style={{ marginBottom: 10 }}>
								{field.label}: {value || field.min} {field.unit}
							</Text>
							<Slider
								style={{ width: '100%', height: 40 }}
								minimumValue={field.min}
								maximumValue={field.max}
								step={field.step || 1}
								value={field.min}
								onValueChange={onChange}
								minimumTrackTintColor='#007AFF'
								maximumTrackTintColor='#d3d3d3'
							/>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
									marginTop: 5,
								}}>
								<Text style={{ fontSize: 12, color: '#666' }}>
									{field.min} {field.unit}
								</Text>
								<Text style={{ fontSize: 12, color: '#666' }}>
									{field.max} {field.unit}
								</Text>
							</View>
						</View>
					)}
				/>
			);

		default:
			return null;
	}
};
