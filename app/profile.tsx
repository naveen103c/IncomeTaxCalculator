import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from 'react-native-safe-area-context';
import { exportDatabaseAsJSON } from '../utils/database';

export default function Profile() {
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

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

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
      const dbData = await exportDatabaseAsJSON();
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
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>
                {name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'NA'}
              </Text>
            </View>
            <Text style={styles.profileName}>{name}</Text>
          </View>

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

            <TouchableOpacity style={styles.settingItem} onPress={handleViewDatabase}>
              <Text style={styles.settingText}>View Database (Debug)</Text>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
          </View>

          {/* App Version */}
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ...existing styles...
  radioButton: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    backgroundColor: '#fff',
  },
  radioButtonSelected: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  radioButtonText: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '500',
  },
  radioButtonTextSelected: {
    color: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
  },
  profileHeader: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1e40af',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#dbeafe',
  },
  card: {
    backgroundColor: '#fff',
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
    color: '#1f2937',
    marginBottom: 16,
  },
  editButton: {
    fontSize: 16,
    color: '#2563eb',
    fontWeight: '600',
  },
  infoGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 6,
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: '#1f2937',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  datePickerText: {
    fontSize: 16,
    color: '#1f2937',
  },
  calendarIcon: {
    fontSize: 16,
    color: '#6b7280',
  },
  cancelButton: {
    backgroundColor: '#e5e7eb',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  cancelButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  summaryValue: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '500',
  },
  summaryLabelBold: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: 'bold',
  },
  summaryValueBold: {
    fontSize: 18,
    color: '#dc2626',
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 12,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingText: {
    fontSize: 16,
    color: '#1f2937',
  },
  settingArrow: {
    fontSize: 24,
    color: '#9ca3af',
  },
  logoutButton: {
    backgroundColor: '#dc2626',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#9ca3af',
  },
  ageContainer: {
    marginTop: 8,
  },
  ageText: {
    fontSize: 16,
    color: '#1f2937',
  },
  ageCategoryContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  ageCategory: {
    fontSize: 14,
    color: '#6b7280',
    marginRight: 8,
  },
  ageCategoryActive: {
    fontWeight: 'bold',
    color: '#2563eb',
  },
});