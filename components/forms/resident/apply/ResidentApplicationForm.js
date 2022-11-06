import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { supabase } from '@/utils/supabase'
import Submitting from '@/components/forms/utility/Submitting'
// Solo
import SoloStepOne from '@/components/forms/resident/apply/steps/solo/SoloStepOne'
import SoloStepTwo from '@/components/forms/resident/apply/steps/solo/SoloStepTwo'
import SoloStepThree from '@/components/forms/resident/apply/steps/solo/SoloStepThree'
import SoloStepFour from '@/components/forms/resident/apply/steps/solo/SoloStepFour'
import SoloStepFive from '@/components/forms/resident/apply/steps/solo/SoloStepFive'
import SoloStepSix from '@/components/forms/resident/apply/steps/solo/SoloStepSix'
import SoloStepSeven from '@/components/forms/resident/apply/steps/solo/SoloStepSeven'
import SoloStepEight from '@/components/forms/resident/apply/steps/solo/SoloStepEight'
import SoloStepNine from '@/components/forms/resident/apply/steps/solo/SoloStepNine'
import SoloStepTen from '@/components/forms/resident/apply/steps/solo/SoloStepTen'
// Group
import GroupStepOne from '@/components/forms/resident/apply/steps/group/GroupStepOne'
import GroupStepTwo from '@/components/forms/resident/apply/steps/group/GroupStepTwo'
import GroupStepThree from '@/components/forms/resident/apply/steps/group/GroupStepThree'
import GroupStepFour from '@/components/forms/resident/apply/steps/group/GroupStepFour'
import GroupStepFive from '@/components/forms/resident/apply/steps/group/GroupStepFive'
import GroupStepSix from '@/components/forms/resident/apply/steps/group/GroupStepSix'
import GroupStepSeven from '@/components/forms/resident/apply/steps/group/GroupStepSeven'
import GroupStepEight from '@/components/forms/resident/apply/steps/group/GroupStepEight'
import GroupStepNine from '@/components/forms/resident/apply/steps/group/GroupStepNine'
import GroupStepTen from '@/components/forms/resident/apply/steps/group/GroupStepTen'
import GroupStepElevenInviteNow from '@/components/forms/resident/apply/steps/group/GroupStepElevenInviteNow'
import GroupStepElevenInviteLater from '@/components/forms/resident/apply/steps/group/GroupStepElevenInviteLater'
import GroupStepTwelve from '@/components/forms/resident/apply/steps/group/GroupStepTwelve'
// NotInRegion
import NotInRegionStepOne from '@/components/forms/resident/apply/steps/notInRegion/NotInRegionStepOne'
import NotInRegionStepTwo from '@/components/forms/resident/apply/steps/notInRegion/NotInRegionStepTwo'

import DashboardHeader from '@/components/header/DashboardHeader'
import { post } from '@/utils/api/request'
import { trackFormSubmitted, trackNewResidentInvited, trackExistingResidentInvited } from '@/utils/segment/track'

  const data = {
    locations: [],
    income: "",
    medianIncome: "",
    incomeAfterTax: "",
    savings: "",
    medianSavings: "",
    budget: "",
    name: {
      firstName: "",
      middleNames: "",
      lastName: "",
    },
    previousName: {
      firstName: "",
      middleNames: "",
      lastName: "",
    },
    birthday: "",
    legalName: false,
    changedName: false,
    group: false,
    inviteNow: true,
    flatmates: [{
      firstName: "",
      lastName: "",
      email: "",
      userExists: false,
      userId: null,
      userStatus: null,
      budget: 0,
    }],
    invitedUser: false,
    residentGroupId: null,
  }

  export default function ResidentApplicationForm({ user, profileData, residentGroupMemberData }) {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const router = useRouter()

  if (user) {
    const userId = user.id
    const userEmail = user.email
  }
  
  const [data, setData] = useState({
    locations: [],
    income: "",
    medianIncome: "",
    incomeAfterTax: "",
    savings: "",
    medianSavings: "",
    budget: "",
    name: {
      firstName: profileData.first_name,
      middleNames: "",
      lastName: profileData.last_name,
    },
    previousName: {
      firstName: "",
      middleNames: "",
      lastName: "",
    },
    birthday: "",
    legalName: false,
    changedName: false,
    group: profileData.resident_group,
    inviteNow: true,
    flatmates: [{
      firstName: "",
      lastName: "",
      email: "",
      userExists: false,
      userId: null,
      userStatus: null,
      budget: 0,
    }],
    invitedUser: profileData.resident_group,
    residentGroupId: null,
  });

  const existingUsers = []
  const newUsers = []

  const checkFlatmates = () => {
    const flatmates = data.flatmates
    flatmates.map((flatmate) => {
      flatmate.userExists?
      !existingUsers.includes(flatmate.firstName) && existingUsers.push(flatmate.firstName)  
      :
      !newUsers.includes(flatmate.firstName) && newUsers.push(flatmate.firstName)   
    })
    return {existingUsers, newUsers} 
  }

  const checkLocations = () => {
    const investorRegions = data.locations
    const auckland = investorRegions.includes("Auckland")
    const otherRegions = investorRegions.filter(region => region !== "Auckland")
    return {auckland, otherRegions}
  }

  const [currentStep, setCurrentStep] = useState(0);
  
  console.log(data);

  function preparePayloads(formData, userId, userEmail) {

    const residentApplicationPayload = {
        locations: formData.locations,
        income: formData.income,
        savings: formData.savings,
        legal_first_name: formData.name.firstName,
        legal_middle_names: formData.name.middleNames,
        legal_last_name: formData.name.lastName,
        previous_first_name: formData.previousName.firstName,
        previous_middle_names: formData.previousName.middleNames,
        previous_last_name: formData.previousName.lastName,
        birthday: formData.birthday,
        changed_name: formData.changedName,
        median_income: formData.medianIncome,
        median_savings: formData.medianSavings,
        resident_group_id: formData.residentGroupId,
        group: formData.group,
        budget: formData.budget,
        income_after_tax: formData.incomeAfterTax,
        invite_now: formData.inviteNow,
      }

      const profilePayload = {
        status: "pre-approved",
        first_name: formData.name.firstName,
        last_name: formData.name.lastName,
        resident_group: formData.group,
        birthday: formData.birthday,
        median_income: formData.medianIncome,
        median_savings: formData.medianSavings,
        income_after_tax: formData.incomeAfterTax,
        budget: formData.budget,
      }

      const primaryResidentGroupMember = {
        user_id: userId,
        resident_group_id: "",
        first_name: formData.name.firstName,
        last_name: formData.name.lastName,
        email: userEmail,
        status: "pre-approved",
        budget: formData.budget,
      }

      const createResidentGroupPayload = {user_id: userId}

      const residentNotInRegionPayload = {
        locations: formData.locations
      }

      const notInRegionProfilePayload = {
        status: "not_in_region"
      }
  
    return {
        residentApplicationPayload: residentApplicationPayload,
        profilePayload: profilePayload,
        primaryResidentGroupMember: primaryResidentGroupMember,
        createResidentGroupPayload: createResidentGroupPayload,
        residentNotInRegionPayload: residentNotInRegionPayload,
        notInRegionProfilePayload: notInRegionProfilePayload,
    }
}

async function createResidentApplication(residentApplicationPayload, residentGroupId) {
    return new Promise(resolve => {
      (async () => {
        try {

            if (residentGroupId) {
                residentApplicationPayload.resident_group_id = residentGroupId
            }

            // Insert row to resident applications
            const { data, error } = await supabase
            .from("resident_applications")
            .insert([
                residentApplicationPayload
            ])
            
            if (error) {
                console.log("Supabase error:", error)
                resolve("Supabase error:", error)
            } else {
                console.log("resident_application: ", data);
                resolve(data)
            }

        } catch (error) {
            console.log("API error: ", error);
            resolve(error)
        }
      })()
    })
}

async function updateResidentGroupMember(residentGroupMemberId, residentGroupId, formData) {
    return new Promise(resolve => {
      (async () => {
        try {
            // Update resident group members row
            const { data, error } = await supabase
            .from("resident_group_members")
            .update({ 
                status: "pre-approved",
                budget: formData.budget 
            })
            .eq('id', residentGroupMemberId)
            .eq('resident_group_id', residentGroupId)

            if (error) {
                console.log("Supabase error:", error)
                resolve("Supabase error:", error)
            } else {
                console.log("resident_group_member: ", data);
                resolve(data)
            }

        } catch (error) {
            console.log("API error: ", error);
            resolve(error)
        }
      })()
    })
}

async function updateResidentGroupBudget(residentGroupId) {
    return new Promise(resolve => {
      (async () => {
        try {
            // Update the resident group budget
            const { data, error } = await supabase
            .rpc('update_resident_group_budget', { group_id: residentGroupId })

            if (error) {
              console.log("Supabase error:", error)
              resolve("Supabase error:", error)
            } else {
              console.log("groupBudget: ", data);
              resolve(data)
            }

        } catch (error) {
            console.log("API error: ", error);
            resolve(error)
        }
      })()
    })
}

async function checkResidentGroupStatus(residentGroupId) {
    return new Promise(resolve => {
      (async () => {
        try {
            // Get all resident group members
            const { data, error } = await supabase
            .from("resident_group_members")
            .select()
            .eq("resident_group_id", residentGroupId)

            if (error) {
              console.log("Supabase error:", error)
              resolve("Supabase error:", error)

            } else {
              // Check if all group members are pre-approved
              console.log("resident_group_members: ", data)
              
              function containsOnly(array1, array2){
                return array2.every(elem => array1.includes(elem))
              }
              
              let groupMemberStatus = data.map((groupMember) => groupMember.status)
              console.log('groupMemberStatus: ', groupMemberStatus);

              let groupPreApproved = containsOnly(["pre-approved"], groupMemberStatus)
              console.log('groupPreApproved: ', groupPreApproved);

              resolve(groupPreApproved)
            }

        } catch (error) {
            console.log("API error: ", error);
            resolve(error)
        }
      })()
    })
}

async function updateResidentGroupStatus(groupApproved, residentGroupId) {
    return new Promise(resolve => {
      (async () => {
        try {
            let groupStatus = ''

            if (groupApproved) {
                groupStatus = 'pre-approved'
            } else {
                groupStatus = 'not-approved'
            }

            // Update resident group status
            const { data, error } = await supabase
            .from("resident_groups")
            .update({ status: groupStatus })
            .eq('id', residentGroupId)

            if (error) {
            console.log("Supabase error:", error)
            resolve("Supabase error:", error)
            } else {
            console.log("resident_group: ", data);
            resolve(data)
            }

        } catch (error) {
            console.log("API error: ", error);
            resolve(error)
        }
      })()
    })
}

async function updateProfile(profilePayload, userId) {
    return new Promise(resolve => {
      (async () => {
        try {
            const { data, error } = await supabase
            .from("profiles")
            .update(profilePayload)
            .eq('id', userId)
            
            if (error) {
                console.log("Supabase error:", error)
                resolve("Supabase error:", error)
            } else {
                console.log("profile: ", data);
                resolve(data)
            }

        } catch (error) {
            console.log("API error: ", error);
            resolve(error)
        }
      })()
    })
}

async function createResidentGroup(createResidentGroupPayload) {
    return new Promise(resolve => {
      (async () => {
        try {
            await post('/api/supabase/resident-groups/create', createResidentGroupPayload).then((result) => {
                const data = result
                console.log("API result: ", data);
                const createdResidentGroupId = data[0].id
                resolve(createdResidentGroupId)
            })
        } catch (error) {
            console.log("API error: ", error);
            resolve(error)
        }
      })()
    })
}

function prepareFlatmatesPayloads(inviteNow, formData, userId, primaryResidentGroupMember, residentGroupId) {

    let invitedFlatmates = []
    let existingUsers = []
    let newUsers = []

    if (inviteNow) {
        formData.flatmates.map((flatmate) => {
    
            let flatmatePayload = {
                user_id: (flatmate.userExists ? flatmate.userId : null),
                resident_group_id: residentGroupId,
                first_name: flatmate.firstName,
                last_name: flatmate.lastName,
                email: flatmate.email,
                status: (flatmate.userExists ? flatmate.userStatus : "invited"),
                invited_by: userId,
                budget: flatmate.budget,
            }
        
            flatmate.userExists?
            existingUsers.push(flatmatePayload) && invitedFlatmates.push(flatmatePayload)
            :
            newUsers.push(flatmatePayload) && invitedFlatmates.push(flatmatePayload)
        
        })
    } else {
        console.log("inviteNow is false");
    }

    // Set resident_group_id in primaryResidentGroupMember = id from resident_group created above
    primaryResidentGroupMember.resident_group_id = residentGroupId

    const residentGroupMembersPayload = {
    primaryResidentGroupMember: primaryResidentGroupMember,
    invitedFlatmates
    }
  
    return {
        invitedFlatmates: invitedFlatmates,
        newUsers: newUsers,
        existingUsers: existingUsers,
        residentGroupMembersPayload: residentGroupMembersPayload,
    }
}

async function createResidentGroupMembers(residentGroupMembersPayload) {
    return new Promise(resolve => {
      (async () => {
        try {
            await post('/api/supabase/resident-group-members/create', residentGroupMembersPayload).then((result) => {
                const data = result
                console.log("API result: ", data); 
                
                let newResidentGroupMembers = []
                let existingResidentGroupMembers = []
                
                data.map((record) => {
                    !record.user_id? 
                    newResidentGroupMembers.push(record)
                    :
                    existingResidentGroupMembers.push(record)
                })
        
                console.log("newResidentGroupMembers: ", newResidentGroupMembers)
                console.log("existingResidentGroupMembers: ", existingResidentGroupMembers)

                resolve({
                    data: data, 
                    newResidentGroupMembers: newResidentGroupMembers, 
                    existingResidentGroupMembers: existingResidentGroupMembers
                })

            })
        } catch (error) {
            console.log("API error: ", error);
            resolve(error)
        }
      })()
    })
}

async function updateExistingUserProfiles(existingResidentGroupMembers) {
    return new Promise(resolve => {
      (async () => {
        try {
            const profilesPayload = {}

            existingResidentGroupMembers.map((user) => {
            let key = user.user_id
            let value = {payload: {resident_group: true}}
            profilesPayload[key] = value
            })

            await post('/api/supabase/profiles/update', profilesPayload).then((result) => {
                const data = result
                console.log("API result: ", data);
                resolve(data)
            })
        } catch (error) {
            console.log("API error: ", error);
            resolve(error)
        }
      })()
    })
}

async function sendNotifications(userId, userEmail, profileData, newResidentGroupMembers, existingResidentGroupMembers) {
    return new Promise(resolve => {
      (async () => {
        try {

            const eventTitle = "Add Flatmates Form Submitted"
            const eventUserId = userId
            const eventEmail = userEmail
            const eventProperties = {
                name: profileData.first_name + " " + profileData.last_name,
                first_name: profileData.first_name,
                last_name: profileData.last_name,
                user_type: profileData.user_type
            }

            // Track Segment Event - Add Flatmates Form Submitted
            trackFormSubmitted(eventTitle, eventUserId, eventEmail, eventProperties)

            // Trigger Segment track event for each New Resident Invited
            newResidentGroupMembers.map((newResident) => {
                        
            const eventTitle = "New Resident Group Member Invited"
            const eventUserId = userId
            const eventEmail = userEmail
            const eventProperties = {
                first_name: newResident.first_name,
                email: newResident.email,
                invited_by: profileData.first_name,
                sign_up_url: "https://dev.stayhamlet.com/auth/sign-in?resident_group_members_id=" + newResident.id + "&resident_group_id=" + newResident.resident_group_id,
            }
            
            trackNewResidentInvited(eventTitle, eventUserId, eventEmail, eventProperties)
            
            })

            // Trigger Segment track event for each Existing Resident Invited
            let existingResidentGroupMembersToInvite = existingResidentGroupMembers.filter(function(resident) {
            return resident.user_id != userId
            })

            existingResidentGroupMembersToInvite.map((existingResident) => {
            
            const eventTitle = "Existing Resident Group Member Invited"
            const eventUserId = userId
            const eventEmail = userEmail
            const eventProperties = {
                first_name: existingResident.first_name,
                email: existingResident.email,
                invited_by: profileData.first_name,
                userId: existingResident.user_id,
            }
            
            trackExistingResidentInvited(eventTitle, eventUserId, eventEmail, eventProperties)
            
            })

            resolve("segment track events triggered, notifications sent")

        } catch (error) {
            console.log("API error: ", error);
            resolve(error)
        }
      })()
    })
}

async function createResidentNotInRegion(residentNotInRegionPayload) {
    return new Promise(resolve => {
      (async () => {
        try {
            const { data, error } = await supabase
          .from("residents_not_in_region")
          .insert([
            residentNotInRegionPayload
          ])

            if (error) {
              console.log("Supabase error:", error)
              resolve("Supabase error:", error)
            } else {
              console.log("resident_not_in_region: ", data);
              resolve(data)
            }

        } catch (error) {
            console.log("API error: ", error);
            resolve(error)
        }
      })()
    })
}

async function makeRequest(formData, userId, userEmail, profileData, residentGroupMemberData) {

  return new Promise(resolve => {

      (async () => {

          const {
              residentApplicationPayload,
              profilePayload,
              primaryResidentGroupMember,
              createResidentGroupPayload,
              residentNotInRegionPayload,
              notInRegionProfilePayload,
          } = preparePayloads(formData, userId, userEmail)
    
          console.log({
              residentApplicationPayload: residentApplicationPayload,
              profilePayload: profilePayload,
              primaryResidentGroupMember: primaryResidentGroupMember,
              createResidentGroupPayload: createResidentGroupPayload,
              residentNotInRegionPayload: residentNotInRegionPayload,
              notInRegionProfilePayload: notInRegionProfilePayload,
          });

          let qualified = true

          if (formData.locations.includes('Auckland')) {
              // In Auckland
              if (formData.group) {
                  // In a group
                  if (formData.invitedUser) {
                      // Invited user

                      try {
                          const result1 = await createResidentApplication(residentApplicationPayload, residentGroupMemberData.resident_group_id);
                          console.log("result1: ", result1);
                      } catch (error) {
                          console.log("error: ", error);
                          resolve(error)
                      }
            
                      try {
                          const result2 = await updateResidentGroupMember(residentGroupMemberData.id, residentGroupMemberData.resident_group_id, formData);
                          console.log("result2: ", result2);
                      } catch (error) { 
                          console.log("error: ", error);
                          resolve(error)
                      }

                      try {
                          const result3 = await updateResidentGroupBudget(residentGroupMemberData.resident_group_id);
                          console.log("result3: ", result3);
                      } catch (error) { 
                          console.log("error: ", error);
                          resolve(error)
                      }
            
                      let groupApproved = false
          
                      try {
                          const result4 = await checkResidentGroupStatus(residentGroupMemberData.resident_group_id);
                          console.log("result4: ", result4);
                          groupApproved = result4
                      } catch (error) {
                          console.log("error: ", error);
                          resolve(error)
                      }
            
                      try {
                          const result5 = await updateResidentGroupStatus(groupApproved, residentGroupMemberData.resident_group_id);
                          console.log("result5: ", result5);
                      } catch (error) {
                          console.log("error: ", error);
                          resolve(error)
                      }
            
                      try {
                          const result6 = await updateProfile(profilePayload, userId);
                          console.log("result6: ", result6);
                      } catch (error) {
                          console.log("error: ", error);
                          resolve(error)
                      }

                  } else if (formData.inviteNow) {
                      // Invite Now

                      let createdResidentGroup = null

                      try {
                          const result1 = await createResidentGroup(createResidentGroupPayload);
                          console.log("result1: ", result1);
                          createdResidentGroup = result1
                      } catch (error) {
                          console.log("error: ", error);
                          resolve(error)
                      }
            
                      try {
                          const result2 = await createResidentApplication(residentApplicationPayload, createdResidentGroup);
                          console.log("result2: ", result2);
                      } catch (error) { 
                          console.log("error: ", error);
                          resolve(error)
                      }

                      const {
                          invitedFlatmates: invitedFlatmates,
                          newUsers: newUsers,
                          existingUsers: existingUsers,
                          residentGroupMembersPayload: residentGroupMembersPayload,
                      } = prepareFlatmatesPayloads(true, formData, userId, primaryResidentGroupMember, createdResidentGroup)
                
                      console.log({
                          invitedFlatmates: invitedFlatmates,
                          newUsers: newUsers,
                          existingUsers: existingUsers,
                          residentGroupMembersPayload: residentGroupMembersPayload,
                      });

                      let newResidentGroupMembersPayload = []
                      let existingResidentGroupMembersPayload = []

                      try {
                          const {data, newResidentGroupMembers, existingResidentGroupMembers} = await createResidentGroupMembers(residentGroupMembersPayload);
                          console.log(data, newResidentGroupMembers, existingResidentGroupMembers);
                          newResidentGroupMembersPayload = newResidentGroupMembers
                          existingResidentGroupMembersPayload = existingResidentGroupMembers
                      } catch (error) {
                          console.log("error: ", error);
                          resolve(error)
                      }

                      try {
                          const result4 = await updateResidentGroupBudget(createdResidentGroup)
                          console.log("result4: ", result4);
                      } catch (error) { 
                          console.log("error: ", error);
                          resolve(error)
                      }
            
                      let groupApproved = false
          
                      try {
                          const result5 = await checkResidentGroupStatus(createdResidentGroup);
                          console.log("result5: ", result5);
                          groupApproved = result5
                      } catch (error) {
                          console.log("error: ", error);
                          resolve(error)
                      }
            
                      try {
                          const result6 = await updateResidentGroupStatus(groupApproved, createdResidentGroup);
                          console.log("result6: ", result6);
                      } catch (error) {
                          console.log("error: ", error);
                          resolve(error)
                      }
            
                      try {
                          const result7 = await updateProfile(profilePayload, userId);
                          console.log("result7: ", result7);
                      } catch (error) {
                          console.log("error: ", error);
                          resolve(error)
                      }

                      try {
                          const result8 = await updateExistingUserProfiles(existingResidentGroupMembersPayload)
                          console.log("result8: ", result8);
                      } catch (error) {
                          console.log("error: ", error);
                          resolve(error)
                      }

                      try {
                          const result9 = await sendNotifications(userId, userEmail, profileData, newResidentGroupMembersPayload, existingResidentGroupMembersPayload);
                          console.log("result9: ", result9);
                      } catch (error) {
                          console.log("error: ", error);
                          resolve(error)
                      }

                  } else {
                      // Invite Later

                      let createdResidentGroup = null

                      try {
                          const result1 = await createResidentGroup(createResidentGroupPayload);
                          console.log("result1: ", result1);
                          createdResidentGroup = result1
                      } catch (error) {
                          console.log("error: ", error);
                          resolve(error)
                      }
            
                      try {
                          const result2 = await createResidentApplication(residentApplicationPayload, createdResidentGroup);
                          console.log("result2: ", result2);
                      } catch (error) { 
                          console.log("error: ", error);
                          resolve(error)
                      }

                      const {
                          invitedFlatmates: invitedFlatmates,
                          newUsers: newUsers,
                          existingUsers: existingUsers,
                          residentGroupMembersPayload: residentGroupMembersPayload,
                      } = prepareFlatmatesPayloads(false, formData, userId, primaryResidentGroupMember, createdResidentGroup)
                
                      console.log({
                          invitedFlatmates: invitedFlatmates,
                          newUsers: newUsers,
                          existingUsers: existingUsers,
                          residentGroupMembersPayload: residentGroupMembersPayload,
                      });

                      let newResidentGroupMembersPayload = []
                      let existingResidentGroupMembersPayload = []

                      try {
                          const {data, newResidentGroupMembers, existingResidentGroupMembers} = await createResidentGroupMembers(residentGroupMembersPayload);
                          console.log(data, newResidentGroupMembers, existingResidentGroupMembers);
                          newResidentGroupMembersPayload = newResidentGroupMembers
                          existingResidentGroupMembersPayload = existingResidentGroupMembers
                      } catch (error) {
                          console.log("error: ", error);
                          resolve(error)
                      }

                      try {
                          const result4 = await updateResidentGroupBudget(createdResidentGroup)
                          console.log("result4: ", result4);
                      } catch (error) { 
                          console.log("error: ", error);
                          resolve(error)
                      }
            
                      let groupApproved = false
          
                      try {
                          const result5 = await checkResidentGroupStatus(createdResidentGroup);
                          console.log("result5: ", result5);
                          groupApproved = result5
                      } catch (error) {
                          console.log("error: ", error);
                          resolve(error)
                      }
            
                      try {
                          const result6 = await updateResidentGroupStatus(groupApproved, createdResidentGroup);
                          console.log("result6: ", result6);
                      } catch (error) {
                          console.log("error: ", error);
                          resolve(error)
                      }
            
                      try {
                          const result7 = await updateProfile(profilePayload, userId);
                          console.log("result7: ", result7);
                      } catch (error) {
                          console.log("error: ", error);
                          resolve(error)
                      }

                  }
              } else {
                  // Solo
                  
                  console.log("solo user");

                  try {
                      const result1 = await createResidentApplication(residentApplicationPayload, null);
                      console.log("result1: ", result1);
                  } catch (error) { 
                      console.log("error: ", error);
                      resolve(error)
                  }

                  try {
                      const result2 = await updateProfile(profilePayload, userId);
                      console.log("result2: ", result2);
                  } catch (error) {
                      console.log("error: ", error);
                      resolve(error)
                  }

              }
          } else {
              // Not in region

              try {
                  const result1 = await createResidentNotInRegion(residentNotInRegionPayload)
                  console.log("result1: ", result1);
              } catch (error) { 
                  console.log("error: ", error);
                  resolve(error)
              }

              try {
                  const result2 = await updateProfile(notInRegionProfilePayload, userId)
                  console.log("result2: ", result2);
              } catch (error) {
                  console.log("error: ", error);
                  resolve(error)
              }

              qualified = false

          } 
          
          if (qualified) {
              resolve("success - qualified")
          } else {
              resolve("success - not qualified")
          }

        })();

  })
  
}

async function handleFormSubmit(formData, userId, userEmail, profileData, residentGroupMemberData) {

    return new Promise(resolve => {
      (async () => {
        try {
          console.log("submitting: ", submitting);
          const result = await makeRequest(formData, userId, userEmail, profileData, residentGroupMemberData);

          setSubmitted(true)
          setSubmitting(false)

          // Define Segment Event Payload
          const eventUserId = userId
          const eventEmail = userEmail
          const eventProperties = {
            name: profileData.first_name + " " + profileData.last_name,
            first_name: profileData.first_name,
            last_name: profileData.last_name,
            user_type: profileData.user_type
          }

          if (result === "success - qualified") {
            console.log(result);
            console.log("nice, the function worked all the way through");

            const eventTitle = "Resident Form Submitted"
            // Track Segment Event - Resident Form Submitted
            trackFormSubmitted(eventTitle, eventUserId, eventEmail, eventProperties)
            
            console.log("qualified and done");

            router.push('/resident/apply/book')  

          } else if (result === "success - not qualified") {
            console.log(result);
            console.log("nice, the function worked all the way through");

            // Track Segment Event - Resident Form Not In Region Submitted
            const eventTitle = "Resident Form Not In Region Submitted"
            trackFormSubmitted(eventTitle, eventUserId, eventEmail, eventProperties)

            console.log("not qualified and done");

            router.push('/resident/dashboard')

          } else {
            console.log(result);
            console.log("too bad, the function failed along the way");
          }

          resolve("form submitted")

        } catch (error) {
            console.log("error: ", error);
            resolve(error)
        }
      })();
    })
}
  
  const handleNextStep = (newData, final = false) => {
    setData((prev) => ({...prev, ...newData}));
  
    if (final) {
      setSubmitting(true);
      handleFormSubmit(newData, user.id, user.email, profileData, residentGroupMemberData)
    }
  
    setCurrentStep((prev) => prev + 1)
  }
  
  const handlePrevStep = (newData) => {
    setData((prev) => ({...prev, ...newData}));
    setCurrentStep((prev) => prev - 1)
  }
  
  const stepsSolo = [
    <SoloStepOne next={handleNextStep} data={data}/>, 
    <SoloStepTwo next={handleNextStep} prev={handlePrevStep} data={data}/>,
    <SoloStepThree next={handleNextStep} prev={handlePrevStep} data={data}/>,
    <SoloStepFour next={handleNextStep} prev={handlePrevStep} data={data}/>,
    <SoloStepFive next={handleNextStep} prev={handlePrevStep} data={data}/>,
    <SoloStepSix next={handleNextStep} prev={handlePrevStep} data={data}/>,
    <SoloStepSeven next={handleNextStep} prev={handlePrevStep} data={data}/>,
    <SoloStepEight next={handleNextStep} prev={handlePrevStep} data={data}/>,
    <SoloStepNine next={handleNextStep} prev={handlePrevStep} data={data}/>,
    <SoloStepTen next={handleNextStep} prev={handlePrevStep} data={data} submitting={submitting}/>,
  ]
  const stepsGroupInvitedUser = [
    <GroupStepOne next={handleNextStep} data={data}/>, 
    <GroupStepTwo next={handleNextStep} prev={handlePrevStep} data={data}/>,
    <GroupStepThree next={handleNextStep} prev={handlePrevStep} data={data}/>,
    <GroupStepFour next={handleNextStep} prev={handlePrevStep} data={data}/>,
    <GroupStepFive next={handleNextStep} prev={handlePrevStep} data={data}/>,
    <GroupStepSix next={handleNextStep} prev={handlePrevStep} data={data}/>,
    <GroupStepSeven next={handleNextStep} prev={handlePrevStep} data={data}/>,
    <GroupStepNine next={handleNextStep} prev={handlePrevStep} data={data}/>,
    <GroupStepTwelve next={handleNextStep} prev={handlePrevStep} data={data} submitting={submitting}/>,
  ]
  const stepsGroupInviteNow = [
    <GroupStepOne next={handleNextStep} data={data}/>, 
    <GroupStepTwo next={handleNextStep} prev={handlePrevStep} data={data}/>,
    <GroupStepThree next={handleNextStep} prev={handlePrevStep} data={data}/>,
    <GroupStepFour next={handleNextStep} prev={handlePrevStep} data={data}/>,
    <GroupStepFive next={handleNextStep} prev={handlePrevStep} data={data}/>,
    <GroupStepSix next={handleNextStep} prev={handlePrevStep} data={data}/>,
    <GroupStepSeven next={handleNextStep} prev={handlePrevStep} data={data}/>,
    <GroupStepEight next={handleNextStep} prev={handlePrevStep} data={data}/>,
    <GroupStepNine next={handleNextStep} prev={handlePrevStep} data={data}/>,
    <GroupStepTen next={handleNextStep} prev={handlePrevStep} data={data}/>,
    <GroupStepElevenInviteNow next={handleNextStep} prev={handlePrevStep} data={data}/>,
    <GroupStepTwelve next={handleNextStep} prev={handlePrevStep} data={data} submitting={submitting}/>,
  ]
  const stepsGroupInviteLater = [
    <GroupStepOne next={handleNextStep} data={data}/>, 
    <GroupStepTwo next={handleNextStep} prev={handlePrevStep} data={data}/>,
    <GroupStepThree next={handleNextStep} prev={handlePrevStep} data={data}/>,
    <GroupStepFour next={handleNextStep} prev={handlePrevStep} data={data}/>,
    <GroupStepFive next={handleNextStep} prev={handlePrevStep} data={data}/>,
    <GroupStepSix next={handleNextStep} prev={handlePrevStep} data={data}/>,
    <GroupStepSeven next={handleNextStep} prev={handlePrevStep} data={data}/>,
    <GroupStepEight next={handleNextStep} prev={handlePrevStep} data={data}/>,
    <GroupStepNine next={handleNextStep} prev={handlePrevStep} data={data}/>,
    <GroupStepTen next={handleNextStep} prev={handlePrevStep} data={data}/>,
    <GroupStepElevenInviteLater next={handleNextStep} prev={handlePrevStep} data={data} submitting={submitting}/>,
  ]
  const stepsNotInRegion = [
    <NotInRegionStepOne next={handleNextStep} data={data}/>, 
    <NotInRegionStepTwo next={handleNextStep} prev={handlePrevStep} data={data} submitting={submitting}/>, 
  ]

  const soloHeaderContent = [
    {
      title: "Step 1 of 10", 
      main: "Location",
      description: "Where are you looking to rent a home?",
    },
    {
      title: "Step 2 of 10", 
      main: "Hamlet operates in Auckland",
      description: (typeof data.locations === "undefined" ? null : (checkLocations().auckland ? (checkLocations().otherRegions.length > 0 ? "We serve Auckland but sadly we aren't in " + checkLocations().otherRegions.map((region) => region).join(', ').replace(/,(?!.*,)/gmi, ' or ') + " yet."  : "Good news, we cover all of Auckland!") : "Sorry, we don't serve " + checkLocations().otherRegions.map((region) => region).join(', ').replace(/,(?!.*,)/gmi, ' or ') + " yet.")), 
    },
    {
      title: "Step 3 of 10", 
      main: "Annual income",
      description: "We will use this figure to pre-approve you for a specific rental budget and won't ask you for proof of funds until you have a home lined up.",
    },
    {
      title: "Step 4 of 10", 
      main: "Savings",
      description: "If you have any savings let us know, we'll factor them into the calculation when we pre-approve your rental budget.",
    },
    {
      title: "Step 5 of 10", 
      main: "Legal Name",
      description: "Please enter your full legal name and check the box below.",
    },
    {
      title: "Step 6 of 10", 
      main: "Changed name",
      description: "Have you ever changed your name in the past?",
    },
    {
      title: "Step 7 of 10", 
      main: "Date of birth",
      description: "When were you born?",
    },
    {
      title: "Step 8 of 10", 
      main: "Group",
      description: "Will you be renting on your own or with others?",
    },
    {
      title: "Step 9 of 10", 
      main: "Nice one!",
      description: "You've been pre-approved 🎉 🥳",
    },
    {
      title: "Step 10 of 10", 
      main: "Book a call",
      description: "Chat with the Hamlet team.",
    },
  ]

  const groupInvitedUserHeaderContent = [
    {
      title: "Step 1 of 9", 
      main: "Location",
      description: "Where are you looking to rent a home?",
    },
    {
      title: "Step 2 of 9", 
      main: "Hamlet operates in Auckland",
      description: (typeof data.locations === "undefined" ? null : (checkLocations().auckland ? (checkLocations().otherRegions.length > 0 ? "We serve Auckland but sadly we aren't in " + checkLocations().otherRegions.map((region) => region).join(', ').replace(/,(?!.*,)/gmi, ' or ') + " yet."  : "Good news, we cover all of Auckland!") : "Sorry, we don't serve " + checkLocations().otherRegions.map((region) => region).join(', ').replace(/,(?!.*,)/gmi, ' or ') + " yet.")), 
    },
    {
      title: "Step 3 of 9", 
      main: "Annual income",
      description: "We will use this figure to pre-approve you for a specific rental budget and won't ask you for proof of funds until you have a home lined up.",
    },
    {
      title: "Step 4 of 9", 
      main: "Savings",
      description: "If you have any savings let us know, we'll factor them into the calculation when we pre-approve your rental budget.",
    },
    {
      title: "Step 5 of 9", 
      main: "Legal Name",
      description: "Please enter your full legal name and check the box below.",
    },
    {
      title: "Step 6 of 9", 
      main: "Changed name",
      description: "Have you ever changed your name in the past?",
    },
    {
      title: "Step 7 of 9", 
      main: "Date of birth",
      description: "When were you born?",
    },
    {
      title: "Step 8 of 9", 
      main: "Nice one!",
      description: "You've been pre-approved 🎉 🥳",
    },
    {
      title: "Step 9 of 9", 
      main: "Book a call",
      description: "Chat with the Hamlet team.",
    },
  ]

  const groupInviteLaterHeaderContent = [
    {
      title: "Step 1 of 11", 
      main: "Location",
      description: "Where are you looking to rent a home?",
    },
    {
      title: "Step 2 of 11", 
      main: "Hamlet operates in Auckland",
      description: (typeof data.locations === "undefined" ? null : (checkLocations().auckland ? (checkLocations().otherRegions.length > 0 ? "We serve Auckland but sadly we aren't in " + checkLocations().otherRegions.map((region) => region).join(', ').replace(/,(?!.*,)/gmi, ' or ') + " yet."  : "Good news, we cover all of Auckland!") : "Sorry, we don't serve " + checkLocations().otherRegions.map((region) => region).join(', ').replace(/,(?!.*,)/gmi, ' or ') + " yet.")), 
    },
    {
      title: "Step 3 of 11", 
      main: "Annual income",
      description: "We will use this figure to pre-approve you for a specific rental budget and won't ask you for proof of funds until you have a home lined up.",
    },
    {
      title: "Step 4 of 11", 
      main: "Savings",
      description: "If you have any savings let us know, we'll factor them into the calculation when we pre-approve your rental budget.",
    },
    {
      title: "Step 5 of 11", 
      main: "Legal Name",
      description: "Please enter your full legal name and check the box below.",
    },
    {
      title: "Step 6 of 11", 
      main: "Changed name",
      description: "Have you ever changed your name in the past?",
    },
    {
      title: "Step 7 of 11", 
      main: "Date of birth",
      description: "When were you born?",
    },
    {
      title: "Step 8 of 11", 
      main: "Group",
      description: "Will you be renting on your own or with others?",
    },
    {
      title: "Step 9 of 11", 
      main: "Nice one!",
      description: "You've been pre-approved 🎉 🥳",
    },
    {
      title: "Step 10 of 11", 
      main: "Invite your flatmate(s)",
      description: "Once your flatmates have signed up, we will update the pre-approval amount for the group as a whole.",
    },
    {
      title: "Step 11 of 11", 
      main: "Book a call",
      description: "No problem, you can invite your flatmates from the 'Resident Group' page in the Hamlet app.",
    },
  ]
  const groupInviteNowHeaderContent = [
    {
      title: "Step 1 of 12", 
      main: "Location",
      description: "Where are you looking to rent a home?",
    },
    {
      title: "Step 2 of 12", 
      main: "Hamlet operates in Auckland",
      description: (typeof data.locations === "undefined" ? null : (checkLocations().auckland ? (checkLocations().otherRegions.length > 0 ? "We serve Auckland but sadly we aren't in " + checkLocations().otherRegions.map((region) => region).join(', ').replace(/,(?!.*,)/gmi, ' or ') + " yet."  : "Good news, we cover all of Auckland!") : "Sorry, we don't serve " + checkLocations().otherRegions.map((region) => region).join(', ').replace(/,(?!.*,)/gmi, ' or ') + " yet.")), 
    },
    {
      title: "Step 3 of 12", 
      main: "Annual income",
      description: "We will use this figure to pre-approve you for a specific rental budget and won't ask you for proof of funds until you have a home lined up.",
    },
    {
      title: "Step 4 of 12", 
      main: "Savings",
      description: "If you have any savings let us know, we'll factor them into the calculation when we pre-approve your rental budget.",
    },
    {
      title: "Step 5 of 12", 
      main: "Legal Name",
      description: "Please enter your full legal name and check the box below.",
    },
    {
      title: "Step 6 of 12", 
      main: "Changed name",
      description: "Have you ever changed your name in the past?",
    },
    {
      title: "Step 7 of 12", 
      main: "Date of birth",
      description: "When were you born?",
    },
    {
      title: "Step 8 of 12", 
      main: "Group",
      description: "Will you be renting on your own or with others?",
    },
    {
      title: "Step 9 of 12", 
      main: "Nice one!",
      description: "You've been pre-approved 🎉 🥳",
    },
    {
      title: "Step 10 of 12", 
      main: "Invite your flatmate(s)",
      description: "Once your flatmates have signed up, we will update the pre-approval amount for the group as a whole.",
    },
    {
      title: "Step 11 of 12", 
      main: "Invite your flatmate(s)",
      description: "Enter in your flatmate(s) emails below to send them an invite.",
    },
    {
      title: "Step 12 of 12", 
      main: "Book a call",
      description: 
      (typeof data.flatmates === "undefined" ? null : "Thanks for that. " 
      + (checkFlatmates().existingUsers.length > 0 ? "Looks like " + checkFlatmates().existingUsers.map((firstName) => firstName).join(', ').replace(/,(?!.*,)/gmi, ' and ') + (checkFlatmates().existingUsers.length > 1 ? " have " : " has " ) + "already signed up, we'll add them to your group. " : "" )
      + (checkFlatmates().newUsers.length > 0 ? "We'll send " + checkFlatmates().newUsers.map((firstName) => firstName).join(', ').replace(/,(?!.*,)/gmi, ' and ') + " an email with a link to join Hamlet." : "" )
      ),
    },
  ]
  const notInRegionHeaderContent = [
    {
      title: "Step 1 of 2", 
      main: "Location",
      description: "Where are you looking to rent a home?",
    },
    {
      title: "Step 2 of 2",
      main: "Hamlet operates in Auckland",
      description: (typeof data.locations === "undefined" ? "" : (checkLocations().auckland ? (checkLocations().otherRegions.length > 0 ? "We serve Auckland but sadly we aren't in " + checkLocations().otherRegions.map((region) => region).join(', ').replace(/,(?!.*,)/gmi, ' or ') + " yet."  : "Good news, we cover all of Auckland!") : "Sorry, we don't serve " + checkLocations().otherRegions.map((region) => region).join(', ').replace(/,(?!.*,)/gmi, ' or ') + " yet.")), 
    },
  ]

  const primaryCard = [
    {
      id: "step-one-image",
      imageSrc: 'https://cijtrwqqphdofjmlvaee.supabase.co/storage/v1/object/public/public/resident/apply/start/pexels-jeffrey-czum-3330118.jpg',
      imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
      color: 'indigo-500',
    },
    {
      id: "step-two-image",
      imageSrc: 'https://cijtrwqqphdofjmlvaee.supabase.co/storage/v1/object/public/public/resident/apply/start/douglas-bagg-mgQxd18r5Ds-unsplash.jpg',
      imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
      color: 'teal-500',
    },
    {
      id: "step-three-image",
      imageSrc: 'https://cijtrwqqphdofjmlvaee.supabase.co/storage/v1/object/public/public/resident/apply/start/oliur-Z8I-BhVtzn0-unsplash.jpg',
      imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
      color: 'indigo-500',
    },
    {
      id: "step-four-image",
      imageSrc: 'https://cijtrwqqphdofjmlvaee.supabase.co/storage/v1/object/public/public/resident/apply/start/pexels-ann-h-4146005.jpg',
      imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
      color: 'teal-500',
    },
    {
      id: "step-five-image",
      imageSrc: 'https://cijtrwqqphdofjmlvaee.supabase.co/storage/v1/object/public/public/resident/apply/start/pexels-karolina-grabowska-4195334.jpg',
      imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
      color: 'indigo-500',
    },
    {
      id: "step-six-image",
      imageSrc: 'https://cijtrwqqphdofjmlvaee.supabase.co/storage/v1/object/public/public/resident/apply/start/pexels-ono-kosuki-5999866.jpg',
      imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
      color: 'teal-500',
    },
    {
      id: "step-seven-image",
      imageSrc: 'https://cijtrwqqphdofjmlvaee.supabase.co/storage/v1/object/public/public/resident/apply/start/pexels-vlada-karpovich-7099895.jpg',
      imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
      color: 'indigo-500',
    },
    {
      id: "step-eight-image",
      imageSrc: 'https://cijtrwqqphdofjmlvaee.supabase.co/storage/v1/object/public/public/resident/apply/start/pexels-karolina-grabowska-6134939.jpg',
      imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
      color: 'teal-500',
    },
    {
      id: "step-nine-image",
      imageSrc: 'https://cijtrwqqphdofjmlvaee.supabase.co/storage/v1/object/public/public/resident/apply/start/pexels-pineapple-supply-co-1071879.jpg',
      imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
      color: 'indigo-500',
    },
    {
      id: "step-ten-image",
      imageSrc: 'https://cijtrwqqphdofjmlvaee.supabase.co/storage/v1/object/public/public/people/pexels-jack-krzysik-6611628.jpg',
      imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
      color: 'teal-500',
    },
    {
      id: "step-eleven-image",
      imageSrc: 'https://cijtrwqqphdofjmlvaee.supabase.co/storage/v1/object/public/public/house/pexels-jeffrey-czum-3330118.jpg?t=2022-08-03T00%3A46%3A40.245Z',
      imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
      color: 'indigo-500',
    },
    {
      id: "step-twelve-image",
      imageSrc: 'https://cijtrwqqphdofjmlvaee.supabase.co/storage/v1/object/public/public/people/pexels-jack-krzysik-6611628.jpg',
      imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
      color: 'teal-500',
    },
  ]
  
      return (
        <>

            {submitting && 
                <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                        <Submitting/>
                    </div>
                </div>
            }
            {!(submitted || submitting) &&
                    <div>
                      <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6 lg:gap-8">
                        <div>
                        {((data.locations.includes('Auckland')) || (data.locations.length === 0)) ? 
                          <>
                          {(data.invitedUser) ? 
                          <>
                          <DashboardHeader headerContent={groupInvitedUserHeaderContent[currentStep]} />
                          </>
                          :
                          <>
                          {(data.group) ?
                          <>
                          {(data.inviteNow) ?
                          <>
                          <DashboardHeader headerContent={groupInviteNowHeaderContent[currentStep]} />
                          </>
                          :
                          <>
                          <DashboardHeader headerContent={groupInviteLaterHeaderContent[currentStep]}/>
                          </>
                          }
                          </>
                          :
                          <>
                          <DashboardHeader headerContent={soloHeaderContent[currentStep]} />
                          </>
                          }
                          </>
                          }
                          </>
                          :
                          <> 
                          <DashboardHeader headerContent={notInRegionHeaderContent[currentStep]} />
                          </>
                        }
                          <div className="w-full max-w-sm lg:w-96">
                              <div className='form-wrapper'>
                              {((data.locations.includes('Auckland')) || (data.locations.length === 0)) ? 
                              <>
                              {(data.invitedUser) ? 
                              <>
                              {stepsGroupInvitedUser[currentStep]}
                              </>
                              :
                              <>
                              {(data.group) ?
                                <> 
                                {(data.inviteNow) ?
                                <>
                                {stepsGroupInviteNow[currentStep]}
                                </>
                                :
                                <>
                                {stepsGroupInviteLater[currentStep]}
                                </>
                                }
                                </>
                                : 
                                <>
                                {stepsSolo[currentStep]} 
                                </>
                              }
                              </>
                              }
                              </>
                              :
                              <> 
                              {stepsNotInRegion[currentStep]}
                              </>
                              }
                              </div>
                          </div>
                        </div>
                        <div className="group aspect-w-2 aspect-h-1 shadow-2xl rounded-lg overflow-hidden sm:aspect-h-1 sm:aspect-w-1">
                          <img
                            src={primaryCard[currentStep].imageSrc}
                            alt={primaryCard[currentStep].imageAlt}
                            className="object-center object-cover"
                          />
                          <div aria-hidden="true" className={`bg-gradient-to-b from-transparent to-${primaryCard[currentStep].color} opacity-20`}/>
                        </div>
                      </div>
                    </div>
            }
        </>
      )
    }