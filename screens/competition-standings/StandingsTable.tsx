import { useAppTheme } from '@/hooks';
import { FontAwesome } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';

// Mock data types //TODO Använd type Participant - OBS! Måste skilja på user (helhet i appen) och spelare (nytt objekt för varje tävling, bör hämtas från users id)
type Team = {
	id: string;
	name: string;
	matches: number;
	wins: number;
	gemDifference: number;
	points: number;
	form: string[]; // 'W' | 'L' etc.
	previousRank: number; // for position change
};

type Props = {
	standings: Team[];
	topX?: number; // for conditional styling
};

const StandingsTable: React.FC<Props> = ({ standings, topX }) => {
	const { theme } = useAppTheme();

	const styles = useMemo(
		() =>
			StyleSheet.create({
				table: {
					minWidth: 700,
					margin: theme.sizes.base.spacing,
				},
				row: {
					flexDirection: 'row',
					alignItems: 'center',
					paddingVertical: theme.sizes.spacing.sm,
					borderBottomWidth: theme.sizes.base.border,
					borderColor: theme.colors.border,
					paddingHorizontal: theme.sizes.spacing.xs,
				},
				headerRow: {
					backgroundColor: theme.colors.surface,
					borderBottomWidth: theme.sizes.border.medium,
					borderColor: theme.colors.primary,
				},
				cell: {
					flex: 1,
					color: theme.colors.surface,
					paddingHorizontal: theme.sizes.spacing.xs,
					fontSize: theme.typography.fontSize.xs,
				},
				header: {
					fontWeight: theme.typography.fontWeight.bold,
					color: theme.colors.secondary,
					fontSize: theme.typography.fontSize.sm,
				},
				rankCell: {
					flexDirection: 'row',
					alignItems: 'center',
					gap: theme.sizes.spacing.xs,
				},
				highlightedRow: {
					backgroundColor: theme.colors.accent,
					borderLeftWidth: theme.sizes.spacing.xs,
					borderLeftColor: theme.colors.secondary,
				},
				formCell: {
					flexDirection: 'row',
					gap: theme.sizes.spacing.xs,
				},
				formDot: {
					fontWeight: theme.typography.fontWeight.bold,
					fontSize: theme.typography.fontSize.sm,
					width: theme.sizes.layout.tableCell,
					textAlign: 'center',
				},
				win: {
					color: theme.colors.primary,
				},
				loss: {
					color: theme.colors.secondary,
				},
			}),
		[theme]
	);

	const renderHeader = () => (
		<View style={[styles.row, styles.headerRow]}>
			<Text style={[styles.cell, styles.header]}>#</Text>
			<Text style={[styles.cell, styles.header]}>SPELARE</Text>
			<Text style={[styles.cell, styles.header]}>MATCHER</Text>
			<Text style={[styles.cell, styles.header]}>VINSTER</Text>
			<Text style={[styles.cell, styles.header]}>GEM +/-</Text>
			<Text style={[styles.cell, styles.header]}>POÄNG</Text>
			<Text style={[styles.cell, styles.header]}>FORM</Text>
		</View>
	);

	const renderPositionChange = (prev: number, current: number) => {
		if (prev > current) {
			return (
				<FontAwesome
					name='arrow-up'
					size={12}
					color='#05FF32'
				/>
			);
		} else if (prev < current) {
			return (
				<FontAwesome
					name='arrow-down'
					size={12}
					color='#FF3B30'
				/>
			);
		} else {
			return (
				<FontAwesome
					name='minus'
					size={12}
					color='#999'
				/>
			);
		}
	};

	const renderRow = ({ item, index }: { item: Team; index: number }) => {
		const rank = index + 1;
		const isTop = topX ? rank <= topX : false;

		return (
			<View style={[styles.row, isTop && styles.highlightedRow]}>
				<Text style={[styles.cell, styles.rankCell]}>
					{rank} {renderPositionChange(item.previousRank, rank)}
				</Text>
				<Text style={styles.cell}>{item.name}</Text>
				<Text style={styles.cell}>{item.matches}</Text>
				<Text style={styles.cell}>{item.wins}</Text>
				<Text style={styles.cell}>{item.gemDifference}</Text>
				<Text style={styles.cell}>{item.points}</Text>
				<View style={[styles.cell, styles.formCell]}>
					{item.form.map((res, i) => (
						<Text
							key={i}
							style={[styles.formDot, res === 'W' ? styles.win : styles.loss]}>
							{res}
						</Text>
					))}
				</View>
			</View>
		);
	};

	return (
		<ScrollView horizontal>
			<View style={styles.table}>
				<FlatList
					data={standings}
					keyExtractor={(item) => item.id}
					ListHeaderComponent={renderHeader}
					stickyHeaderIndices={[0]}
					renderItem={renderRow}
				/>
			</View>
		</ScrollView>
	);
};

export default StandingsTable;

import { StyleSheet } from 'react-native';
