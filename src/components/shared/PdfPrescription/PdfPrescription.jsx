import {
    View,
    Text,
    TouchableOpacity,
    Linking,
    ScrollView,
    Image,
    TextInput,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import {format} from 'date-fns';
  import {useStoreActions, useStoreState} from 'easy-peasy';
  import {Button} from 'react-native-paper';
  import {useForm} from 'react-hook-form';
  import {launchImageLibrary} from 'react-native-image-picker';
  import Modal from 'react-native-modal';
  import AddMedicineForm from '../AddMedicineForm/AddMedicineForm';
  import MedicinList from '../MedicinList/MedicinList';
  import {ActionForm} from '../../PrescriptionComponents/ActionFrom';
  
  const Header = () => {
    return (
      <View style={{alignItems: 'center', padding: 10}}>
        <Text style={{fontSize: 40, textDecorationLine: 'underline'}}>
          Sureline Health
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 20,
            flexWrap: 'wrap',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://www.surelinehealth.com')}>
            <Text style={{color: 'blue'}}>www.surelinehealth.com</Text>
          </TouchableOpacity>
          <Text>sureline.official@gmail.com</Text>
        </View>
        <Text style={{marginTop: 5}}>
          <Text style={{fontWeight: 'bold'}}>Tel:</Text> 019543666618
        </Text>
      </View>
    );
  };
  
  const DoctorHeader = ({appointmentByIdData}) => {
    if (appointmentByIdData.length === 0) return null;
  
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 30,
        }}>
        <View style={{flex: 1}}>
          <Text style={{fontWeight: 'bold'}}>
            {appointmentByIdData?.doctor?.title}{' '}
            {appointmentByIdData?.doctor?.firstName}{' '}
            {appointmentByIdData?.doctor?.lastName}
          </Text>
          <Text>{appointmentByIdData?.doctor?.designation}</Text>
          <Text>{appointmentByIdData?.doctor?.speciality}</Text>
          <Text>{appointmentByIdData?.doctor?.organization}</Text>
          <Text>
            <Text style={{fontWeight: 'bold'}}>BMDC Reg. No-</Text>
            {appointmentByIdData?.doctor?.bmdcNumber}
          </Text>
        </View>
        <View style={{flex: 1}}>
          <Text>
            <Text style={{fontWeight: 'bold'}}>Date:</Text>{' '}
            {format(
              new Date(appointmentByIdData?.prescription?.createdAt),
              'M/d/yyyy',
            )}
          </Text>
          <Text>
            <Text style={{fontWeight: 'bold'}}>Ref:</Text>{' '}
            {appointmentByIdData?.prescription?.ref}
          </Text>
        </View>
      </View>
    );
  };
  
  const PatientHeader = ({appointmentByIdData}) => {
    console.log(appointmentByIdData?.patientDetails?.fullName);
    if (!appointmentByIdData) return null;
    return (
      <View>
        <Text
          style={{
            textAlign: 'center',
            textDecorationLine: 'underline',
            marginTop: 10,
          }}>
          Patient Info.
        </Text>
        <View>
          <View>
            <View style={{flexBasis: '33.33%', padding: 5}}>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Name:</Text>{' '}
                {appointmentByIdData?.patientDetails?.fullName}
              </Text>
            </View>
            <View style={{flexBasis: '33.33%', padding: 5}}>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Age:</Text>{' '}
                {appointmentByIdData?.patientDetails?.age}
              </Text>
            </View>
            <View style={{flexBasis: '33.33%', padding: 5}}>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Gender:</Text>{' '}
                {appointmentByIdData?.patientDetails?.gender}
              </Text>
            </View>
            <View style={{flexBasis: '33.33%', padding: 5}}>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Height:</Text>{' '}
                {appointmentByIdData?.patientDetails?.height}-ft
              </Text>
            </View>
            <View style={{flexBasis: '33.33%', padding: 5}}>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Weight:</Text>{' '}
                {appointmentByIdData?.patientDetails?.weight}-kg
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  
  const MainSection = ({item, isDoctor, appointmentByIdData}) => {
    return (
      <>
        <View style={{flexGrow: 1, marginTop: 40}}>
          <View style={{flexDirection: 'row', marginHorizontal: 8}}>
            <View
              style={{
                flex: 5,
                borderRightWidth: 1,
                borderRightColor: 'gray',
                padding: 10,
              }}>
              <Section1 item={item} isDoctor={isDoctor} />
            </View>
            <View style={{flex: 7}}>
              <Section2
                isDoctor={isDoctor}
                appointmentByIdData={appointmentByIdData}
              />
            </View>
          </View>
        </View>
        <View style={{borderBottomWidth: 1, borderBottomColor: 'gray'}} />
      </>
    );
  };
  
  const PatientInfoWithHandleDoctor = ({isDoctor, item}) => {
    console.log(item);
  
    if (!item) return null;
  
    return (
      <>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: 'bold', color: 'orange'}}>Problem:</Text>
            <Text>{item?.prescription?.problem || 'N/A'}</Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: 'gray',
              marginVertical: 10,
            }}
          />
  
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: 'bold'}}>Temperature:</Text>
            <Text>{item?.prescription?.temperature || 'N/A'}</Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: 'gray',
              marginVertical: 10,
            }}
          />
  
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: 'bold'}}>Blood Pressure:</Text>
            <Text>{item?.prescription?.blood_presure || 'N/A'}</Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: 'gray',
              marginVertical: 10,
            }}
          />
  
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: 'bold'}}>Pulse:</Text>
            <Text>{item?.prescription?.pulse || 'N/A'}</Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: 'gray',
              marginVertical: 10,
            }}
          />
  
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: 'bold'}}>R/R:</Text>
            <Text>{item?.prescription?.r_r || 'N/A'}</Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: 'gray',
              marginVertical: 10,
            }}
          />
  
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: 'bold'}}>Lungs:</Text>
            <Text>{item?.prescription?.lungs || 'N/A'}</Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: 'gray',
              marginVertical: 10,
            }}
          />
  
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: 'bold'}}>Others:</Text>
            <Text>{item?.prescription?.others || 'N/A'}</Text>
          </View>
        </View>
      </>
    );
  };
  const TestRecommendation = ({item, isDoctor, index}) => {
    const {uploadTestResult, deleteTest} = useStoreActions(
      action => action.testRecommendation,
    );
  
    const id = item._id;
    const [open, setOpen] = useState(false);
    const [localImage, setLocalImage] = useState(item.image); // Store uploaded image locally
  
    // Handle Image Upload
    const handleImagePick = () => {
      launchImageLibrary({mediaType: 'photo'}, response => {
        if (response.didCancel || response.error) {
          console.log('User cancelled image picker or an error occurred');
        } else {
          const imageUri = response.assets[0].uri;
          setLocalImage(imageUri); // Update local image immediately
  
          const formData = new FormData();
          formData.append('image', {
            uri: imageUri,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
          });
  
          uploadTestResult({id, formData})
            .then(() => console.log('Upload successful!'))
            .catch(error => console.error('Upload failed:', error));
        }
      });
    };
  
    return (
      <View
        style={{padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc'}}>
        {/* Header with Test Name & Actions */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>
            {index + 1}. {item.testName}
          </Text>
  
          {localImage ? (
            <TouchableOpacity onPress={() => setOpen(true)}>
              <Text style={{color: 'green'}}>Open Image</Text>
            </TouchableOpacity>
          ) : (
            <Text style={{color: 'gray'}}>No Image</Text>
          )}
  
          {isDoctor && (
            <TouchableOpacity onPress={() => deleteTest(id)}>
              <Text style={{color: 'red'}}>Delete</Text>
            </TouchableOpacity>
          )}
        </View>
  
        {/* Upload Image Button (Only for Non-Doctor Users) */}
        {!isDoctor && (
          <TouchableOpacity
            onPress={handleImagePick}
            style={{
              marginTop: 10,
              padding: 10,
              backgroundColor: '#007bff',
              borderRadius: 5,
            }}>
            <Text style={{color: '#fff', textAlign: 'center'}}>Upload Image</Text>
          </TouchableOpacity>
        )}
  
        {/* Image View Modal */}
        <Modal isVisible={open} onBackdropPress={() => setOpen(false)}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              alignItems: 'center',
              borderRadius: 10,
            }}>
            {localImage ? (
              <Image
                source={{uri: localImage}}
                style={{width: 200, height: 200, resizeMode: 'contain'}}
              />
            ) : (
              <Text>No image available</Text>
            )}
  
            <TouchableOpacity
              onPress={() => setOpen(false)}
              style={{
                marginTop: 10,
                padding: 10,
                backgroundColor: 'red',
                borderRadius: 5,
              }}>
              <Text style={{color: 'white'}}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  };
  
  const TestRecommendationList = ({item}) => {
    const {user} = useStoreState(state => state.user);
    const [openTest, setOpenTest] = useState(false);
  
    const handleClickOpenTest = () => {
      setOpenTest(true);
    };
  
    const handleCloseTest = () => {
      setOpenTest(false);
    };
  
    return (
      <View style={{margin: 10}}>
        {item?.testRecommendation?.length === 0 ? (
          <View style={{flexDirection: 'column', alignItems: 'center', gap: 2}}>
            <Text style={{color: '#555', fontWeight: 'bold', fontSize: 18}}>
              No test yet!
            </Text>
          </View>
        ) : (
          <ScrollView>
            {item?.testRecommendation?.map((rec, index) => (
              <TestRecommendation
                isDoctor={user.role === 'patient' ? false : true}
                key={rec._id}
                item={rec}
                index={index}
              />
            ))}
          </ScrollView>
        )}
      </View>
    );
  };
  const TestRecommendationNew = ({item, isDoctor}) => {
    const {register, handleSubmit, reset} = useForm();
    const {createTest} = useStoreActions(action => action.testRecommendation);
    const apppintmentID = item?._id;
    const id = item?._id;
  
    const {createTestData, deletedData, updatedData} = useStoreState(
      state => state.testRecommendation,
    );
    const {updatedDiag, medicineData, deletedMedicin, instructionData} =
      useStoreState(state => state.prescription);
    const {getAppointmentByid} = useStoreActions(actions => actions.appointment);
    const {appointmentByIdData} = useStoreState(state => state.appointment);
  
    useEffect(() => {
      getAppointmentByid(id);
    }, [id, createTestData, getAppointmentByid, deletedData, updatedData]);
  
    if (!appointmentByIdData) return null;
  
    const onSubmit = data => {
      createTest({data, apppintmentID});
      reset();
    };
  
    if (!item) {
      return null;
    }
  
    return (
      <View style={{marginTop: 50}}>
        <Text style={{textDecorationLine: 'underline', fontSize: 18}}>
          Test Recommendation:
        </Text>
  
        {/* List of tests */}
        <TestRecommendationList item={appointmentByIdData} />
      </View>
    );
  };
  const AddCommentsForm = ({isDoctor, id}) => {
    const {updatePrescription} = useStoreActions(actions => actions.prescription);
    const {register, handleSubmit, reset} = useForm();
  
    const onSubmit = data => {
      updatePrescription({data, id});
      reset();
    };
  
    return (
      <View style={{marginTop: 10}}>
        {isDoctor && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 20,
              justifyContent: 'space-evenly',
            }}>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                padding: 10,
                flex: 1,
                marginRight: 10,
                borderRadius: 5,
              }}
              placeholder="Add comments"
              {...register('comments')}
            />
            <Button title="Add Comments" onPress={handleSubmit(onSubmit)} />
          </View>
        )}
      </View>
    );
  };
  const Comments = ({isDoctor, item}) => {
    const {getPrescriptionById} = useStoreActions(
      actions => actions.prescription,
    );
  
    const {getPrescriptionByIdData, updatedData} = useStoreState(
      state => state.prescription,
    );
    const id = item?.prescription?._id;
  
    useEffect(() => {
      // console.log('calling')
      // console.log(item?.prescription?._id)
      getPrescriptionById({id: item?.prescription?._id});
    }, [id, getPrescriptionById, updatedData, item?.prescription?._id]);
  
    if (!getPrescriptionByIdData) return null;
  
    return (
      <View style={{marginTop: 50, paddingHorizontal: 20}}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            textDecorationLine: 'underline',
          }}>
          Comments:
        </Text>
  
        {/* Add Comments Form */}
        <AddCommentsForm id={id} isDoctor={isDoctor} />
  
        {/* Display Comments */}
        {getPrescriptionByIdData?.comments ? (
          <Text style={{marginTop: 10}}>{getPrescriptionByIdData?.comments}</Text>
        ) : (
          <Text style={{marginTop: 10, color: 'gray'}}>No comments added</Text>
        )}
      </View>
    );
  };
  
  const Section1 = ({item, isDoctor}) => {
    return (
      <View>
        <PatientInfoWithHandleDoctor item={item} isDoctor={isDoctor} />
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: 'gray',
            marginVertical: 10,
          }}
        />
        <TestRecommendationNew item={item} isDoctor={isDoctor} />
        <Comments item={item} isDoctor={isDoctor} />
      </View>
    );
  };
  const FollowUPAction = ({id}) => {
    const {updatePrescription} = useStoreActions(action => action.prescription);
    const [open, setOpen] = useState(false);
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    return (
      <View style={{margin: 10}}>
        <TouchableOpacity
          onPress={handleOpen}
          style={{
            backgroundColor: '#007bff',
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
          }}>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>Edit</Text>
        </TouchableOpacity>
  
        <Modal visible={open} animationType="slide" transparent={true}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '80%',
                backgroundColor: '#fff',
                padding: 20,
                borderRadius: 10,
              }}>
              <ActionForm
                id={id}
                type="followUp"
                handleClose={handleClose}
                handleAction={updatePrescription}
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  
  const AddInstructionForm = ({id}) => {
    const {updatePrescription} = useStoreActions(actions => actions.prescription);
    const {control, handleSubmit, reset} = useForm();
  
    const onSubmit = data => {
      updatePrescription({data, id});
      reset();
    };
  
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          padding: 10,
        }}>
        <Controller
          control={control}
          name="advice"
          rules={{required: true}}
          render={({field: {onChange, value}}) => (
            <TextInput
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
                padding: 8,
              }}
              placeholder="Enter Your Advice"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <Button
          title="Add Advice"
          onPress={handleSubmit(onSubmit)}
          color="#007BFF"
        />
      </View>
    );
  };
  
  const Section2 = ({isDoctor, appointmentByIdData}) => {
    const {getPrescriptionById} = useStoreActions(
      actions => actions.prescription,
    );
    const {getPrescriptionByIdData, updatedData} = useStoreState(
      state => state.prescription,
    );
    const id = appointmentByIdData?.prescription?._id;
  
    useEffect(() => {
      getPrescriptionById({id});
    }, [id, getPrescriptionById, updatedData]);
  
    return (
      <View style={{padding: 20}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Rx.</Text>
        {isDoctor && <AddMedicineForm prescriptionID={id} />}
  
        {appointmentByIdData?.prescription?.medicinInstructions?.length !== 0 ? (
          appointmentByIdData?.prescription?.medicinInstructions.map(
            (item, index) => (
              <MedicinList
                key={item._id}
                isDoctor={isDoctor}
                number={index + 1}
                item={item}
              />
            ),
          )
        ) : (
          <Text style={{textAlign: 'center', color: 'gray', marginVertical: 10}}>
            No Medicine Instructions Provided Yet!
          </Text>
        )}
  
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          <Text>
            <Text style={{textDecorationLine: 'underline', fontWeight: 'bold'}}>
              Follow-up within:
            </Text>{' '}
            {getPrescriptionByIdData?.followUp || 'N/A'}
          </Text>
          {isDoctor && <FollowUPAction id={id} />}
        </View>
  
        <View style={{marginTop: 20}}>
          {isDoctor && <AddInstructionForm id={id} />}
          <Text style={{textDecorationLine: 'underline', fontWeight: 'bold'}}>
            Advice:
          </Text>
          <Text>{getPrescriptionByIdData?.advice || 'Not Provided.'}</Text>
        </View>
      </View>
    );
  };
  const Signature = ({item}) => {
    if (!item) return null;
  
    return (
      <View style={{maxWidth: 300, alignItems: 'center', textAlign: 'center'}}>
        <Image
          source={{uri: item?.doctor?.signature}}
          style={{width: '100%', height: 'auto', aspectRatio: 1}}
          resizeMode="contain"
        />
        <Text
          style={{fontSize: 18, fontWeight: '600', color: '#000', marginTop: 8}}>
          Signature
        </Text>
      </View>
    );
  };
  const PresFooter = ({item}) => {
    return (
      <View style={{flexGrow: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <View style={{flex: 1, alignItems: 'center', marginTop: 30}}>
            <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>
              Sureline Health অ্যাপ এবং ওয়েবসাইটের মাধ্যমে প্রয়োজনীয় সেবা গ্ৰহণ
              করুন সহজে।
            </Text>
            <Text style={{fontSize: 14, textAlign: 'center'}}>
              This prescription is generated from Sureline Health platform.{' '}
              <Text style={{fontWeight: 'bold'}}>Ref. No-</Text>{' '}
              {item?.prescription?.ref}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Signature item={item} />
          </View>
        </View>
      </View>
    );
  };

  // Example Signature component - replace with your actual Signature component.

  const PdfPrescription = ({
    item,
    targetRef,
    isDoctor,
    isShow,
    appointmentByIdData,
  }) => {
    if (!appointmentByIdData) return null;
    return (
      <View style={{padding: 15}}>
        <Header />
        <DoctorHeader appointmentByIdData={appointmentByIdData} />
        <PatientHeader appointmentByIdData={appointmentByIdData} />

        <MainSection
          item={item}
          isDoctor={isDoctor}
          appointmentByIdData={appointmentByIdData}
        />
        <PresFooter item={item} />
      </View>
    );
  };

  export default PdfPrescription;
