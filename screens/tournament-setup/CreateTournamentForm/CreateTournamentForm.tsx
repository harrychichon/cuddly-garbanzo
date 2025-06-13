import { TournamentFormat } from '@/configs';
import React, { useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { KeyboardAvoidingView, Text, TouchableOpacity } from 'react-native';
import { FormFieldRenderer } from './helpers/formFieldRenderer';
import getFormConfig from './helpers/getFormConfig';
import { FormField, TournamentFormData } from './types';

type CreateTournamentFormProps = {
	selectedFormat: TournamentFormat;
	onSubmit: (data: TournamentFormData) => void;
};

const CreateTournamentForm = ({
	selectedFormat,
	onSubmit,
}: Readonly<CreateTournamentFormProps>) => {
	const initialFormConfig = getFormConfig(selectedFormat);
	const { control, handleSubmit } = useForm<TournamentFormData>({
		defaultValues: initialFormConfig.defaultValues,
	});

	// Watch the participant count to dynamically update court options
	const participantCountFieldName =
		selectedFormat.type === 'singles' ? 'playerCount' : 'teamCount';
	const participantCount = useWatch({
		control,
		name: participantCountFieldName,
		defaultValue:
			selectedFormat.type === 'singles'
				? selectedFormat.playerRange.min
				: selectedFormat.teamRange.min,
	});

	// Recalculate form config when participant count changes
	const formConfig = useMemo(() => {
		return getFormConfig(selectedFormat, participantCount as number);
	}, [selectedFormat, participantCount]);

	const handleFormSubmit = (data: any) => {
		// Add format type to the data
		const formattedData = {
			...data,
			formatType: selectedFormat.name,
		} as TournamentFormData;

		onSubmit(formattedData);
	};

	return (
		<KeyboardAvoidingView>
			<Text>Creating: {selectedFormat.name}</Text>
			{formConfig.fields.map((field: FormField) => (
				<FormFieldRenderer
					key={field.name}
					field={field}
					control={control}
				/>
			))}
			<TouchableOpacity onPress={handleSubmit(handleFormSubmit)}>
				<Text>Create Tournament</Text>
			</TouchableOpacity>
		</KeyboardAvoidingView>
	);
};

export default CreateTournamentForm;
