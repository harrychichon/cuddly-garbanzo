import Button from '@/components/MyButton';
import { calculateMaxCourts, CompetitionFormat } from '@/configs';
import { useAppTheme } from '@/hooks';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { KeyboardAvoidingView, Text, View } from 'react-native';

import { useCompetitionStore } from '@/stores/competitionStore';
import { CompetitionFormData } from '../types';
import { FormatStep } from './Step1FormatStep';
import { ParticipantsStep } from './Step2ParticipantStep';
import { CourtsStep } from './Step3CourtsStep';
import { MatchFormatStep } from './Step4MatchFormatStep';

type CreateCompetitionWizardProps = {
	initialFormat?: CompetitionFormat;
	onSubmit?: () => void;
	onCancel?: () => void;
};

const CreateCompetitionWizard = ({
	initialFormat,
	onSubmit,
	onCancel,
}: Readonly<CreateCompetitionWizardProps>) => {
	const { theme } = useAppTheme();
	const { createCompetition } = useCompetitionStore.getState();
	const [currentStep, setCurrentStep] = useState(0);
	const [selectedFormat, setSelectedFormat] =
		useState<CompetitionFormat | null>(initialFormat || null);
	const router = useRouter();

	const today = new Date().toISOString().split('T')[0];
	const defaultCompetitionName = selectedFormat
		? `${selectedFormat.name} ${today}`
		: '';

	const { control, handleSubmit, setValue, getValues, watch } =
		useForm<CompetitionFormData>({
			defaultValues: {
				name: defaultCompetitionName,
				matchFormat:
					'BEST_OF_ONE' as keyof typeof import('@/configs').MATCH_FORMATS,
				formatType:
					selectedFormat?.name as keyof typeof import('@/configs').COMPETITION_FORMATS,
				...(selectedFormat?.formatType === 'singles'
					? { playerCount: selectedFormat.playerRange?.min }
					: { teamCount: selectedFormat?.teamRange?.min || 2 }),
				courtCount: 1,
			},
		});

	// Håller koll på antal deltagare för dynamisk beräkning av antal banor
	const participantCountFieldName =
		selectedFormat?.formatType === 'singles' ? 'playerCount' : 'teamCount';
	const participantCount = useWatch({
		control,
		name: participantCountFieldName,
		defaultValue:
			selectedFormat?.formatType === 'singles'
				? selectedFormat.playerRange?.min
				: selectedFormat?.teamRange?.min || 2,
	});

	// Dynamisk beräkning av antal banor baserat på antal deltagare
	const maxCourts = useMemo(() => {
		if (!participantCount) return 1;
		return calculateMaxCourts(participantCount as number);
	}, [selectedFormat, participantCount]);

	const steps = ['Tävlingsform & namn', 'Deltagare', 'Banor', 'Matchformat'];

	const handleNext = () => {
		if (currentStep < steps.length - 1) {
			setCurrentStep(currentStep + 1);
		}
	};

	const handlePrevious = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	const handleCancel = () => {
		router.push({
			pathname: '/',
		});
	};

	const handleFormatSelect = (format: CompetitionFormat) => {
		setSelectedFormat(format);
		const newDefaultName = `${format.name} ${today}`;
		setValue('name', newDefaultName);
		setValue(
			'formatType',
			format.name as keyof typeof import('@/configs').COMPETITION_FORMATS
		);

		// Bestämmer default för antal spelare
		if (format.formatType === 'singles') {
			setValue('playerCount', format.playerRange.min);
		} else {
			setValue('teamCount', format.teamRange.min);
		}

		// Bestämmer default för antal banor
		setValue('courtCount', 1);
	};

	const handleFormSubmit = async (data: CompetitionFormData) => {
		if (!selectedFormat?.name) return;

		const formattedData = {
			...data,
			formatType: selectedFormat.name,
		};

		try {
			await createCompetition(formattedData);
			router.push({
				pathname: '/competition-management',
			});
		} catch (err) {
			console.error('Error creating competition:', err);
		}
	};

	const canProceedToNext = () => {
		switch (currentStep) {
			case 0:
				return selectedFormat && getValues('name')?.trim();
			case 1:
				return (
					participantCount &&
					participantCount >=
						(selectedFormat?.formatType === 'singles'
							? selectedFormat.playerRange.min
							: selectedFormat?.teamRange?.min || 2)
				);
			case 2:
				return getValues('courtCount') >= 1;
			case 3:
				return getValues('matchFormat');
			default:
				return false;
		}
	};

	const renderStep = () => {
		switch (currentStep) {
			case 0:
				return (
					<FormatStep
						control={control}
						selectedFormat={selectedFormat}
						onFormatSelect={handleFormatSelect}
					/>
				);
			case 1:
				return selectedFormat ? (
					<ParticipantsStep
						control={control}
						format={selectedFormat}
						participantCount={participantCount as number}
					/>
				) : null;
			case 2:
				return selectedFormat ? (
					<CourtsStep
						control={control}
						maxCourts={maxCourts}
						currentCourtCount={getValues('courtCount') || 1}
					/>
				) : null;
			case 3:
				return <MatchFormatStep control={control} />;
			default:
				return null;
		}
	};

	return (
		<KeyboardAvoidingView style={{ flex: 1, padding: 16, width: '100%' }}>
			<View style={{ marginBottom: 24 }}>
				<Text
					style={{
						color: theme.colors.text,
						fontSize: 24,
						fontWeight: 'bold',
						marginBottom: 8,
					}}>
					Skapa turnering
				</Text>
				<Text
					style={{ fontSize: 16, color: theme.colors.text, marginBottom: 16 }}>
					Steg {currentStep + 1} av {steps.length}: {steps[currentStep]}
				</Text>

				{/* Progress bar */}
				<View
					style={{
						height: 4,
						backgroundColor: theme.colors.surfaceElevated,
						borderRadius: 2,
						marginBottom: 16,
					}}>
					<View
						style={{
							height: '100%',
							backgroundColor: theme.colors.cta,
							width: `${((currentStep + 1) / steps.length) * 100}%`,
							borderRadius: 2,
						}}
					/>
				</View>
			</View>

			{/* Step content */}
			<View style={{ flex: 1 }}>{renderStep()}</View>

			{/* Navigation buttons */}
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					marginTop: 24,
					gap: 12,
				}}>
				<View style={{ flex: 1 }}>
					{currentStep > 0 ? (
						<Button
							variant='negative'
							title='Bakåt'
							onPress={handlePrevious}
						/>
					) : (
						<Button
							variant='negative'
							title='Avbryt'
							onPress={handleCancel}
						/>
					)}
				</View>

				<View style={{ flex: 1 }}>
					{currentStep < steps.length - 1 ? (
						<Button
							variant='positive'
							title='Nästa'
							onPress={handleNext}
							disabled={!canProceedToNext()}
						/>
					) : (
						<Button
							variant='positive'
							title='Skapa turnering'
							onPress={handleSubmit(handleFormSubmit)}
							disabled={!canProceedToNext()}
						/>
					)}
				</View>
			</View>
		</KeyboardAvoidingView>
	);
};

export default CreateCompetitionWizard;
