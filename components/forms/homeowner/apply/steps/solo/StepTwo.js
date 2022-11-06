import { useState, useCallback, useRef, Fragment } from 'react'
import { Formik, Form, FieldArray, useFormik } from "formik"
import { Persist } from 'formik-persist'
import * as Yup from "yup";
import { Tab } from '@headlessui/react'
import TextInput from '@/components/forms/inputs/TextInput';
import { PlusCircleIcon, MinusCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'
import dynamic from 'next/dynamic'

const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY

const AddressAutofill = dynamic(
    () => import('@mapbox/search-js-react').then((mod) => mod.AddressAutofill),
    { ssr: false }
);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const yupValidationSchema = Yup.object().shape({
    homes: Yup.array().of(Yup.object().shape({
            address: Yup.object().shape({
                streetAddress: Yup
                .string()
                .required("Street address is required"),
                city: Yup
                .string()
                .required("City is required"),
                region: Yup
                .string()
                .required("Region is required"),
                country: Yup
                .string()
                .required("Country is required"),
                postcode: Yup
                .string()
                .required("Postcode is required"),
            }),
        })).min(1, "Please add at least one home"),
    })

const StepTwo = (props) => {

const handleSubmit = (values) => {
    props.next(values);
};
                
const [selectedIndex, setSelectedIndex] = useState(0)
const [maxHomes, setMaxHomes] = useState(false)
const [hideError, setHideError] = useState(false)

const handleRetrieve = useCallback(
    (res) => {
    setHideError(true)

      setTimeout(() => {    
        setHideError(false)
      }, 100);
    });
    
return (
    <>

    <Formik
    validationSchema={yupValidationSchema}
    initialValues={props.data}
    onSubmit={handleSubmit} 
    >  
    {({values, errors, touched}) => (

        <Form autoComplete="off">
        
        <FieldArray name='homes'>
            {({push, remove}) => {
            console.log(values);
            console.log("errors: ", errors);
            console.log("touched: ", touched);
                return (
                <div>

                <div className="w-full max-w-2xl mx-auto  lg:max-w-none lg:mt-0 lg:col-span-4">

                    <div className='w-full -mt-4 max-w-2xl mx-auto lg:max-w-none lg:col-span-4'>
                        <div className={`${values.homes.length === 3 && 'hidden'} mt-8 sm:col-span-2`}>
                            <button type='button' onClick={() => {
                            if (values.homes.length === 1 || values.homes.length === 2) {
                                setSelectedIndex((prev) => prev + 1)
                                push({
                                        address: {
                                        streetAddress: "",
                                        apartmentNumber: "",
                                        city: "",
                                        region: "",
                                        country: "",
                                        postcode: "",
                                        },
                                        homeType: "",
                                        bedrooms: "",
                                        bathrooms: "",
                                        furnished: "",
                                        occupied: "",
                                        managed: "",
                                        availableFrom: "",
                                })
                            } else if (values.homes.length === 0) {
                                setSelectedIndex(0)
                                push({
                                    address: {
                                        streetAddress: "",
                                        apartmentNumber: "",
                                        city: "",
                                        region: "",
                                        country: "",
                                        postcode: "",
                                    },
                                    homeType: "",
                                    bedrooms: "",
                                    bathrooms: "",
                                    furnished: "",
                                    occupied: "",
                                    managed: "",
                                    availableFrom: "",
                                })
                            } else {
                                setMaxHomes(true)
                            }
                            }} 
                            className="inline-flex w-full items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                                <span className='mr-4 text-indigo-500'>
                                    <PlusCircleIcon className="flex-shrink-0 h-6 w-6"/>
                                </span>
                                {values.homes.length === 0 ? 
                                "Add home"
                                :
                                "Add another home"
                                }
                            </button>
                        </div>
                    </div>

                    {!hideError && errors.homes && touched.homes && errors.homes.constructor === Array && 
                    <div>
                    
                    <div className="rounded-md mt-4 bg-red-50 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <ExclamationCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800">
                                        Check the homes below for missing info
                                    </h3>
                                    <ul role="list" className="text-sm font-medium">
                                    {errors.homes.map((home, index) => ( 
                                    <>  
                                        {((typeof home === "undefined") || (typeof touched.homes[index] === "undefined" )) ? 
                                        null
                                        : 
                                        <>
                                            {errors.homes[index] &&
                                                <li>
                                                    <div className="">
                                                        <p className="text-sm text-red-500">
                                                            {values.homes[index].address.streetAddress? values.homes[index].address.streetAddress : "Home " + (index + 1)} 
                                                        </p>
                                                    </div>
                                                </li>
                                            }
                                        </>
                                        }
                                    </>
                                    ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    }

                    <Tab.Group as="div" selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                    <div className={`${values.homes.length === 0 ? "" : "border-b border-gray-200"}`}>
                        <Tab.List className="-mb-px flex space-x-8">
                            {values.homes.map((home, index) => (
                                <Tab 
                                    key={index}
                                    className={({ selected }) =>
                                    classNames(
                                        selected
                                        ? 'border-indigo-600 text-indigo-600'
                                        : 'border-transparent text-gray-700 hover:text-gray-800 hover:border-gray-300',
                                        'whitespace-nowrap py-6 border-b-2 font-medium text-sm'
                                    )
                                    }
                                >
                                    {!values.homes[index].address || values.homes[index].address.streetAddress === "" ? 
                                    "Home " + (index + 1) 
                                    : 
                                    values.homes[index].address.streetAddress
                                    }
                                </Tab>
                            ))}       
                        </Tab.List>
                    </div>
                    <Tab.Panels as={Fragment}>
                        {values.homes.map((home, index) => (
                            <Tab.Panel className="mb-10">
                                <div key={index} className="mt-4">
                                    
                                    <div className="sm:col-span-2">
                                        <AddressAutofill 
                                        accessToken={mapboxAccessToken}
                                        onRetrieve={handleRetrieve}
                                        options={{
                                            country: 'NZ',
                                            proximity: [174.767, -36.844],
                                            // bbox: '174.42,-37.07,175.20,-36.58',
                                            }}
                                        theme={{
                                            variables: {
                                                fontFamily: 'Inter, sans-serif',
                                                colorBackgroundHover: '#a5b4fc',
                                                unit: '14px',
                                                padding: '0.5em',
                                                borderRadius: '4px',
                                                boxShadow: '0 0 0 1px silver',
                                            }
                                        }}
                                        >
                                            <TextInput
                                                name={`homes.${index}.address.streetAddress`} 
                                                placeholder="Start typing your address, e.g. 123 Main Street..." 
                                                type="text"
                                                label="Street Address"
                                                autoComplete="address-line1"
                                                autoFocus
                                                requiredAsterisk
                                            />
                                        </AddressAutofill>
                                       
                                    </div>
                                    <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4"> 
                                        <div className="mt-4 sm:col-span-2">
                                            <TextInput
                                                name={`homes.${index}.address.apartment`} 
                                                placeholder="Apartment number" 
                                                type="text"
                                                label="Apartment number"
                                                autoComplete="address-line2"
                                            />
                                        </div>

                                        <div>
                                            <TextInput
                                                name={`homes.${index}.address.city`} 
                                                placeholder="City" 
                                                type="text"
                                                label="City"
                                                autoComplete="address-level2"
                                                requiredAsterisk
                                            />
                                        </div>

                                        <div>
                                            <TextInput
                                                name={`homes.${index}.address.region`} 
                                                placeholder="Region" 
                                                type="text"
                                                label="Region"
                                                autoComplete="address-level1"
                                                requiredAsterisk
                                            />
                                        </div>

                                        <div>
                                            <TextInput
                                                name={`homes.${index}.address.country`} 
                                                placeholder="Country" 
                                                type="text"
                                                label="Country"
                                                autoComplete="country"
                                                requiredAsterisk
                                            />
                                        </div>

                                        <div>
                                            <TextInput
                                                name={`homes.${index}.address.postcode`} 
                                                placeholder="Postcode" 
                                                type="text"
                                                label="Postcode"
                                                autoComplete="postal-code"
                                                requiredAsterisk
                                            />
                                        </div>
                                    </div>
                                        <div className="mt-5 sm:col-span-2">
                                            <button type='button' onClick={() => {
                                                if (values.homes.length === 1) {
                                                    setSelectedIndex(0)    
                                                } else {
                                                    setSelectedIndex((prev) => prev - 1)
                                                }
                                                remove(index)
                                            }} 
                                            className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-rose-600 bg-rose-100 hover:bg-rose-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 text-sm">
                                                <span className='text-red-500'>
                                                <MinusCircleIcon className="flex-shrink-0 mr-4 h-6 w-6"/>
                                                </span>
                                                Remove {!values.homes[index].address || values.homes[index].address.streetAddress === "" ? 
                                                " Home " + (index + 1) 
                                                : 
                                                values.homes[index].address.streetAddress
                                                }
                                            </button>
                                        </div>
                                </div>    
                            </Tab.Panel>
                        ))}
                    </Tab.Panels>
                    </Tab.Group>
                </div> 
               
            </div>
                
                )
            }}
        </FieldArray>

        {errors.homes && touched.homes && typeof errors.homes === "string" && 
        <div>
        <p className="mt-2 text-sm text-red-600">
            {errors.homes}
        </p>
        </div>
        }
        <div className='mt-8 flex justify-between'>
            <button
            type={"button"}
            onClick={() => props.prev(values)}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
            Back
            </button>
            <button
            type={"submit"}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
            Next
            </button>
        </div>
        </Form>
    )}
    </Formik>

    </>
)
}

export default StepTwo;