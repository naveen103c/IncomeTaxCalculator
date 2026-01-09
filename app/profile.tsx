import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../src/context/ThemeContext';
import { getStyles } from '../src/styles/common.styles';

export default function Profile() {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState<Date | null>(null);
  const [salaried, setSalaried] = useState(true);
  const [residingInMetro, setResidingInMetro] = useState(false);

  // Temporary state for editing
  const [tempName, setTempName] = useState('');
  const [tempGender, setTempGender] = useState('');
  const [tempDob, setTempDob] = useState<Date | null>(null);
  const [tempSalaried, setTempSalaried] = useState(true);
  const [tempResidingInMetro, setTempResidingInMetro] = useState(false);

  const AgeDisplay = ({ dobDate }: { dobDate: Date | null }) => {
    if (!dobDate || !dob) {
      return null;
    }
  
    const calculateAge = (birthDate: Date) => {
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    };
  
    const age = calculateAge(dobDate);
    let ageGroup = 'General';
    if (age >= 80) {
      ageGroup = 'Super Senior';
    } else if (age >= 60) {
      ageGroup = 'Senior';
    }
  
    return (
      <View style={styles.ageContainer}>
        <Text style={styles.ageText}>Age: {age} years</Text>
        <View style={styles.ageCategoryContainer}>
          <Text style={[styles.ageCategory, ageGroup === 'General' && styles.ageCategoryActive]}>
            General
          </Text>
          <Text style={[styles.ageCategory, ageGroup === 'Senior' && styles.ageCategoryActive]}>
            Senior
          </Text>
          <Text style={[styles.ageCategory, ageGroup === 'Super Senior' && styles.ageCategoryActive]}>
            Super Senior
          </Text>
        </View>
      </View>
    );
  };

  const handleEdit = async () => {
    if (isEditing) {
      try {
        // Save changes to database
        // await saveProfile({
        //   name: tempName,
        //   gender: tempGender,
        //   dob: tempDob,
        //   salaried: tempSalaried,
        //   residingInMetro: tempResidingInMetro,
        // });

        // Update state
        setName(tempName);
        setGender(tempGender);
        setDob(tempDob);
        setSalaried(tempSalaried);
        setResidingInMetro(tempResidingInMetro);

        Alert.alert('Success', 'Profile updated successfully!');
      } catch (error) {
        console.error('Error saving profile:', error);
        Alert.alert('Error', 'Failed to save profile');
      }
    } else {
      // Start editing
      setTempName(name);
      setTempGender(gender);
      setTempDob(dob);
      setTempSalaried(salaried);
      setTempResidingInMetro(residingInMetro);
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setTempName(name);
    setTempGender(gender);
    setTempDob(dob);
    setTempSalaried(salaried);
    setTempResidingInMetro(residingInMetro);
    setShowDatePicker(false);
    setIsEditing(false);
  };

  // Handle date change from date picker
  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false); // Always hide picker on Android after selection/dismiss
    if (event.type === 'set' && selectedDate) {
      setTempDob(selectedDate);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  // View database contents (for debugging)
  const handleViewDatabase = async () => {
    try {
      const dbData = '';
      // dbData = await exportDatabaseAsJSON();
      Alert.alert('Database Contents', dbData, [
        { text: 'OK' }
      ], {
        cancelable: true
      });
    } catch (error) {
      console.error('Error viewing database:', error);
      Alert.alert('Error', 'Failed to load database contents');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.content, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Personal Information */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Personal Information</Text>
              <TouchableOpacity onPress={handleEdit}>
                <Text style={styles.editButton}>
                  {isEditing ? 'Save' : 'Edit'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* ...existing info groups... */}
            <View style={styles.infoGroup}>
              <Text style={styles.label}>Full Name</Text>
              {isEditing ? (<TextInput
                style={styles.input}
                value={tempName}
                onChangeText={setTempName}
                placeholder="Enter your name"
                placeholderTextColor={styles.placeholderTextColor}
              />
              ) : (
                <Text style={styles.value}>{name}</Text>
              )}
            </View>

            <View style={styles.infoGroup}>
              <Text style={styles.label}>Are you Salaried?</Text>
              {isEditing ? (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity
                    style={[
                      styles.radioButton,
                      tempSalaried && styles.radioButtonSelected,
                    ]}
                    onPress={() => setTempSalaried(true)}
                  >
                    <Text style={[
                      styles.radioButtonText,
                      tempSalaried && styles.radioButtonTextSelected
                    ]}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.radioButton,
                      !tempSalaried && styles.radioButtonSelected,
                    ]}
                    onPress={() => setTempSalaried(false)}
                  >
                    <Text style={[
                      styles.radioButtonText,
                      !tempSalaried && styles.radioButtonTextSelected
                    ]}>No</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text style={styles.value}>
                  {salaried ? 'Yes' : 'No'}
                </Text>
              )}
            </View>

            <View style={styles.infoGroup}>
              <Text style={styles.label}>Gender</Text>
              {isEditing ? (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity
                    style={[
                      styles.radioButton,
                      tempGender === 'male' && styles.radioButtonSelected,
                    ]}
                    onPress={() => setTempGender('male')}
                  >
                    <Text style={[
                      styles.radioButtonText,
                      tempGender === 'male' && styles.radioButtonTextSelected
                    ]}>Male</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.radioButton,
                      tempGender === 'female' && styles.radioButtonSelected,
                    ]}
                    onPress={() => setTempGender('female')}
                  >
                    <Text style={[
                      styles.radioButtonText,
                      tempGender === 'female' && styles.radioButtonTextSelected
                    ]}>Female</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.radioButton,
                      tempGender === 'other' && styles.radioButtonSelected,
                    ]}
                    onPress={() => setTempGender('other')}
                  >
                    <Text style={[
                      styles.radioButtonText,
                      tempGender === 'other' && styles.radioButtonTextSelected
                    ]}>Other</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text style={styles.value}>
                  {gender === 'male' ? 'Male' : gender === 'female' ? 'Female' : gender === 'other' ? 'Other' : ''}
                </Text>
              )}
            </View>

            <View style={styles.infoGroup}>
              <Text style={styles.label}>Date of Birth</Text>
              {isEditing ? (
                <>
                  <TouchableOpacity 
                    style={styles.datePickerButton} 
                    onPress={showDatepicker}
                  >
                    <Text style={styles.datePickerText}>
                      {tempDob ? tempDob.toDateString() : 'Select Date'}
                    </Text>
                  </TouchableOpacity>
                  
                  {showDatePicker && (
                    <DateTimePicker
                      value={tempDob || new Date(2000, 0, 1)}
                      mode="date"
                      display="default"
                      onChange={onDateChange}
                      minimumDate={new Date(1920, 0, 1)}
                      maximumDate={new Date()}
                    />
                  )}
                </>
              ) : (
                <>
                  <Text style={styles.value}>{dob ? dob.toDateString() : 'Not set'}</Text>
                  <AgeDisplay dobDate={dob} />
                </>
              )}
            </View>

            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
          </View>

          {/* ...existing cards... */}
          {/* Tax Summary Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Tax Summary (FY 2023-24)</Text>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Preferred Regime</Text>
              <Text style={styles.summaryValue}>New Regime</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabelBold}>Estimated Tax Liability</Text>
              <Text style={styles.summaryValueBold}>₹45,600</Text>
            </View>
          </View>

          {/* Settings Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Settings</Text>

            <TouchableOpacity style={styles.cardItem} onPress={handleViewDatabase}>
              <Text style={styles.cardItemText}>View Database (Debug)</Text>
              <Text style={styles.cardArrow}>›</Text>
            </TouchableOpacity>
          </View>

          {/* App Version */}
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
  );
}