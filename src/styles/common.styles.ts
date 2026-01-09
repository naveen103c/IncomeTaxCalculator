import { Platform, StyleSheet } from 'react-native';

export const getStyles = (colors: any) =>
  StyleSheet.create({
    radioButton: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      paddingVertical: 8,
      paddingHorizontal: 16,
      marginHorizontal: 4,
      backgroundColor: colors.card,
    },
    radioButtonSelected: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    radioButtonText: {
      fontSize: 14,
      color: colors.text,
      fontWeight: '500',
    },
    radioButtonTextSelected: {
      color: colors.card,
    },
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollView: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      padding: 16,
      paddingBottom: 32,
    },
    loadingText: {
      fontSize: 16,
      color: colors.text,
    },
    profileHeader: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      padding: 24,
      alignItems: 'center',
      marginBottom: 16,
    },
    avatarContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },
    avatarText: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.card,
    },
    profileName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.card,
      marginBottom: 4,
    },
    profileEmail: {
      fontSize: 14,
      color: colors.card,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 16,
    },
    editButton: {
      fontSize: 16,
      color: colors.primary,
      fontWeight: '600',
    },
    infoGroup: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      color: colors.text,
      marginBottom: 6,
      fontWeight: '500',
    },
    value: {
      fontSize: 16,
      color: colors.text,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      backgroundColor: colors.card,
      color: colors.text,
    },
    placeholderTextColor: colors.placeholderTextColor,
    datePickerButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      padding: 12,
      backgroundColor: colors.card,
    },
    datePickerText: {
      fontSize: 16,
      color: colors.text,
    },
    summaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
    },
    summaryLabel: {
      fontSize: 14,
      color: colors.text,
    },
    summaryValue: {
      fontSize: 14,
      color: colors.text,
      fontWeight: '500',
    },
    summaryLabelBold: {
      fontSize: 16,
      color: colors.text,
      fontWeight: 'bold',
    },
    summaryValueBold: {
      fontSize: 18,
      color: colors.notification,
      fontWeight: 'bold',
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: 12,
    },
    cardItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    cardItemText: {
      fontSize: 16,
      color: colors.text,
    },
    cardArrow: {
      fontSize: 24,
      color: colors.text,
    },
    mainButton: {
      flex: 1,
      backgroundColor: colors.primaryButton,
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
    },
    mainButtonText: {
      color: colors.primaryButtonText,
      fontSize: 16,
      fontWeight: 'bold',
    },
    secondaryButton: {
      flex: 1,
      backgroundColor: colors.secondaryButton,
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
    },
    secondaryButtonText: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '600',
    },
    cancelButton: {
      flex: 1,
      backgroundColor: colors.cancelButton,
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
    },
    cancelButtonText: {
      color: colors.cancelButtonText,
      fontSize: 16,
      fontWeight: 'bold',
    },
    versionText: {
      textAlign: 'center',
      fontSize: 12,
      color: colors.text,
    },
    ageContainer: {
      marginTop: 8,
    },
    ageText: {
      fontSize: 16,
      color: colors.text,
    },
    ageCategoryContainer: {
      flexDirection: 'row',
      marginTop: 4,
    },
    ageCategory: {
      fontSize: 14,
      color: colors.text,
      marginRight: 8,
    },
    ageCategoryActive: {
      fontWeight: 'bold',
      color: colors.primary,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 20,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: colors.text,
      marginBottom: 24,
    },
    inputSection: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      ...Platform.select({
        ios: {
          shadowColor: colors.text,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        android: {
          elevation: 3,
        },
      }),
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 16,
    },
    inputGroup: {
      marginBottom: 16,
    },
    buttonContainer: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 8,
    },
    summaryCard: {
      backgroundColor: colors.note,
      borderRadius: 12,
      padding: 20,
      marginBottom: 16,
      borderWidth: 2,
      borderColor: colors.note,
    },
    summaryTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#1e40af',
      marginBottom: 16,
      textAlign: 'center',
    },
    summaryAmount: {
      fontSize: 18,
      fontWeight: '600',
      color: '#059669',
    },
    savingsAmount: {
      color: '#059669',
      fontSize: 20,
    },
    recommendation: {
      fontSize: 16,
      color: '#1e40af',
      textAlign: 'center',
      marginTop: 8,
      fontWeight: 'bold',
    },
    regimeCard: {
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        android: {
          elevation: 3,
        },
      }),
    },
    regimeTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#2563eb',
      marginBottom: 16,
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
    },
    detailLabel: {
      fontSize: 14,
      color: colors.text,
    },
    detailValue: {
      fontSize: 14,
      color: colors.text,
      fontWeight: '500',
    },
    boldText: {
      fontWeight: 'bold',
      fontSize: 16,
    },
    taxAmount: {
      color: '#dc2626',
      fontSize: 18,
    },
    infoBox: {
      backgroundColor: '#fef3c7',
      padding: 12,
      borderRadius: 8,
      marginVertical: 8,
    },
    infoText: {
      fontSize: 13,
      color: '#92400e',
    },
    infoCard: {
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      ...Platform.select({
        ios: {
          shadowColor: colors.text,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        android: {
          elevation: 3,
        },
      }),
    },
    infoCardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: 12,
    },
    slabTitle: {
      fontSize: 15,
      fontWeight: 'bold',
      color: '#2563eb',
      marginBottom: 6,
    },
    slabText: {
      fontSize: 14,
      color: '#4b5563',
      marginBottom: 4,
    },
  });