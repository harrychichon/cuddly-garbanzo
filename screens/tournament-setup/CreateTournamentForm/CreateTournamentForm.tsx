import { TournamentFormat } from '@/configs';
import React from 'react';
import { useForm } from 'react-hook-form';
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
	const formConfig = getFormConfig(selectedFormat);

	const { control, handleSubmit } = useForm<TournamentFormData>({
		defaultValues: formConfig.defaultValues,
	});

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

			<TouchableOpacity onPress={handleSubmit(onSubmit)}>
				<Text>Create Tournament</Text>
			</TouchableOpacity>
		</KeyboardAvoidingView>
	);
};

export default CreateTournamentForm;
