import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../src/context/ThemeContext';
import { getStyles } from '../src/styles/common.styles';

interface TaxBreakdown {
  grossIncome: number;
  standardDeduction: number;
  section80C: number;
  section80D: number;
  otherDeductions: number;
  taxableIncome: number;
  totalTax: number;
  cess: number;
  totalTaxWithCess: number;
}

export default function Home() {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const [grossIncome, setGrossIncome] = useState('');
  const [section80C, setSection80C] = useState('');
  const [section80D, setSection80D] = useState('');
  const [otherDeductions, setOtherDeductions] = useState('');
  const [showResults, setShowResults] = useState(false);

  // Old Regime Tax Slabs (FY 2023-24)
  const calculateOldRegimeTax = (income: number): TaxBreakdown => {
    const standardDeduction = 50000;
    const deduction80C = Math.min(parseFloat(section80C) || 0, 150000);
    const deduction80D = Math.min(parseFloat(section80D) || 0, 25000);
    const otherDed = parseFloat(otherDeductions) || 0;
    
    const totalDeductions = standardDeduction + deduction80C + deduction80D + otherDed;
    const taxableIncome = Math.max(0, income - totalDeductions);
    
    let tax = 0;
    if (taxableIncome > 1000000) {
      tax += (taxableIncome - 1000000) * 0.3;
      tax += (1000000 - 500000) * 0.2;
      tax += (500000 - 250000) * 0.05;
    } else if (taxableIncome > 500000) {
      tax += (taxableIncome - 500000) * 0.2;
      tax += (500000 - 250000) * 0.05;
    } else if (taxableIncome > 250000) {
      tax += (taxableIncome - 250000) * 0.05;
    }
    
    const cess = tax * 0.04;
    
    return {
      grossIncome: income,
      standardDeduction,
      section80C: deduction80C,
      section80D: deduction80D,
      otherDeductions: otherDed,
      taxableIncome,
      totalTax: tax,
      cess,
      totalTaxWithCess: tax + cess,
    };
  };

  // New Regime Tax Slabs (FY 2023-24)
  const calculateNewRegimeTax = (income: number): TaxBreakdown => {
    const standardDeduction = 50000;
    const taxableIncome = Math.max(0, income - standardDeduction);
    
    let tax = 0;
    if (taxableIncome > 1500000) {
      tax += (taxableIncome - 1500000) * 0.3;
      tax += (1500000 - 1200000) * 0.2;
      tax += (1200000 - 900000) * 0.15;
      tax += (900000 - 600000) * 0.1;
      tax += (600000 - 300000) * 0.05;
    } else if (taxableIncome > 1200000) {
      tax += (taxableIncome - 1200000) * 0.2;
      tax += (1200000 - 900000) * 0.15;
      tax += (900000 - 600000) * 0.1;
      tax += (600000 - 300000) * 0.05;
    } else if (taxableIncome > 900000) {
      tax += (taxableIncome - 900000) * 0.15;
      tax += (900000 - 600000) * 0.1;
      tax += (600000 - 300000) * 0.05;
    } else if (taxableIncome > 600000) {
      tax += (taxableIncome - 600000) * 0.1;
      tax += (600000 - 300000) * 0.05;
    } else if (taxableIncome > 300000) {
      tax += (taxableIncome - 300000) * 0.05;
    }
    
    const cess = tax * 0.04;
    
    return {
      grossIncome: income,
      standardDeduction,
      section80C: 0,
      section80D: 0,
      otherDeductions: 0,
      taxableIncome,
      totalTax: tax,
      cess,
      totalTaxWithCess: tax + cess,
    };
  };

  const calculateTax = () => {
    const income = parseFloat(grossIncome) || 0;
    if (income > 0) {
      setShowResults(true);
    }
  };

  const resetCalculator = () => {
    setGrossIncome('');
    setSection80C('');
    setSection80D('');
    setOtherDeductions('');
    setShowResults(false);
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
  };

  const income = parseFloat(grossIncome) || 0;
  const oldRegime = calculateOldRegimeTax(income);
  const newRegime = calculateNewRegimeTax(income);
  const savings = oldRegime.totalTaxWithCess - newRegime.totalTaxWithCess;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Tax Calculator 2025-26</Text>
          
          {/* Input Section */}
          <View style={styles.inputSection}>
            <Text style={styles.sectionTitle}>Income Details</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Gross Annual Income *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter amount"
                placeholderTextColor={styles.placeholderTextColor}
                keyboardType="numeric"
                value={grossIncome}
                onChangeText={setGrossIncome}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Section 80C (Max ₹1,50,000)</Text>
              <TextInput
                style={styles.input}
                placeholder="PF, PPF, LIC, etc."
                placeholderTextColor={styles.placeholderTextColor}
                keyboardType="numeric"
                value={section80C}
                onChangeText={setSection80C}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Section 80D (Max ₹25,000)</Text>
              <TextInput
                style={styles.input}
                placeholder="Health Insurance"
                placeholderTextColor={styles.placeholderTextColor}
                keyboardType="numeric"
                value={section80D}
                onChangeText={setSection80D}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Other Deductions</Text>
              <TextInput
                style={styles.input}
                placeholder="80E, 80G, HRA, etc."
                placeholderTextColor={styles.placeholderTextColor}
                keyboardType="numeric"
                value={otherDeductions}
                onChangeText={setOtherDeductions}
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.mainButton} onPress={calculateTax}>
                <Text style={styles.mainButtonText}>Calculate Tax</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.cancelButton} onPress={resetCalculator}>
                <Text style={styles.cancelButtonText}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Results Section */}
          {showResults && income > 0 && (
            <>
              {/* Comparison Summary */}
              <View style={styles.summaryCard}>
                <Text style={styles.summaryTitle}>Tax Comparison</Text>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Old Regime:</Text>
                  <Text style={styles.summaryAmount}>
                    {formatCurrency(oldRegime.totalTaxWithCess)}
                  </Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>New Regime:</Text>
                  <Text style={styles.summaryAmount}>
                    {formatCurrency(newRegime.totalTaxWithCess)}
                  </Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.summaryRow}>
                  <Text style={[styles.summaryLabel, styles.boldText]}>
                    {savings > 0 ? 'You Save with New Regime:' : 'You Save with Old Regime:'}
                  </Text>
                  <Text style={[styles.summaryAmount, styles.savingsAmount]}>
                    {formatCurrency(Math.abs(savings))}
                  </Text>
                </View>
                <Text style={styles.recommendation}>
                  💡 Recommended: {savings > 0 ? 'New Tax Regime' : 'Old Tax Regime'}
                </Text>
              </View>

              {/* Old Regime Details */}
              <View style={styles.regimeCard}>
                <Text style={styles.regimeTitle}>Old Tax Regime</Text>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Gross Income</Text>
                  <Text style={styles.detailValue}>{formatCurrency(oldRegime.grossIncome)}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Standard Deduction</Text>
                  <Text style={styles.detailValue}>- {formatCurrency(oldRegime.standardDeduction)}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Section 80C</Text>
                  <Text style={styles.detailValue}>- {formatCurrency(oldRegime.section80C)}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Section 80D</Text>
                  <Text style={styles.detailValue}>- {formatCurrency(oldRegime.section80D)}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Other Deductions</Text>
                  <Text style={styles.detailValue}>- {formatCurrency(oldRegime.otherDeductions)}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.detailRow}>
                  <Text style={[styles.detailLabel, styles.boldText]}>Taxable Income</Text>
                  <Text style={[styles.detailValue, styles.boldText]}>
                    {formatCurrency(oldRegime.taxableIncome)}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Tax</Text>
                  <Text style={styles.detailValue}>{formatCurrency(oldRegime.totalTax)}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Cess (4%)</Text>
                  <Text style={styles.detailValue}>{formatCurrency(oldRegime.cess)}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.detailRow}>
                  <Text style={[styles.detailLabel, styles.boldText]}>Total Tax</Text>
                  <Text style={[styles.detailValue, styles.boldText, styles.taxAmount]}>
                    {formatCurrency(oldRegime.totalTaxWithCess)}
                  </Text>
                </View>
              </View>

              {/* New Regime Details */}
              <View style={styles.regimeCard}>
                <Text style={styles.regimeTitle}>New Tax Regime</Text>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Gross Income</Text>
                  <Text style={styles.detailValue}>{formatCurrency(newRegime.grossIncome)}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Standard Deduction</Text>
                  <Text style={styles.detailValue}>- {formatCurrency(newRegime.standardDeduction)}</Text>
                </View>
                <View style={styles.infoBox}>
                  <Text style={styles.infoText}>
                    ℹ️ No other deductions available in new regime
                  </Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.detailRow}>
                  <Text style={[styles.detailLabel, styles.boldText]}>Taxable Income</Text>
                  <Text style={[styles.detailValue, styles.boldText]}>
                    {formatCurrency(newRegime.taxableIncome)}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Tax</Text>
                  <Text style={styles.detailValue}>{formatCurrency(newRegime.totalTax)}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Cess (4%)</Text>
                  <Text style={styles.detailValue}>{formatCurrency(newRegime.cess)}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.detailRow}>
                  <Text style={[styles.detailLabel, styles.boldText]}>Total Tax</Text>
                  <Text style={[styles.detailValue, styles.boldText, styles.taxAmount]}>
                    {formatCurrency(newRegime.totalTaxWithCess)}
                  </Text>
                </View>
              </View>

              {/* Tax Slabs Information */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Tax Slabs</Text>
                
                <Text style={styles.slabTitle}>Old Regime:</Text>
                <Text style={styles.slabText}>• Up to ₹2.5L - Nil</Text>
                <Text style={styles.slabText}>• ₹2.5L - ₹5L - 5%</Text>
                <Text style={styles.slabText}>• ₹5L - ₹10L - 20%</Text>
                <Text style={styles.slabText}>• Above ₹10L - 30%</Text>
                
                <Text style={[styles.slabTitle, { marginTop: 12 }]}>New Regime:</Text>
                <Text style={styles.slabText}>• Up to ₹3L - Nil</Text>
                <Text style={styles.slabText}>• ₹3L - ₹6L - 5%</Text>
                <Text style={styles.slabText}>• ₹6L - ₹9L - 10%</Text>
                <Text style={styles.slabText}>• ₹9L - ₹12L - 15%</Text>
                <Text style={styles.slabText}>• ₹12L - ₹15L - 20%</Text>
                <Text style={styles.slabText}>• Above ₹15L - 30%</Text>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
