/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react/jsx-runtime";
import { XCircleIcon } from "@heroicons/react/24/outline";


export interface Article {
    title:string;
  content:string;
  thumbnail:string;
}


export const  GetArticle = (props : any)  => {
    const {id} = props;

    const [isOpen, setIsOpen] = useState(false)

    const openModal = () => {
      setIsOpen(true)
    }
  
    const closeModal = () => {
      setIsOpen(false)
    }

  const [article, setListing] = useState<Article|null>(null);

  const fetchData = async (id:number) => {
    const response = await fetch(`${API_ENDPOINT}/articles/${id}`);
    const json = await response.json();
    setListing(json);
    };
      
  const  FetchArticle = (id : number)  => {
          useEffect(() => {
              fetchData(id);
          }, []);
    }
  
    FetchArticle(id)
   
   return(
        <>

            <button onClick={openModal} id="{article.id}" className="rounded-md bg-[#FFAD42] px-4 py-2 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">Read-More ...</button>

            <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>
                
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-[800px] transform overflow-hidden rounded-2xl bg-[#EEE7DF] text-[#2C121B] p-6 text-left align-middle shadow-xl transition-all">
                            <div className="flex flex-row justify-end">
                                <XCircleIcon onClick={closeModal} className="h-6 w-6 text-gray-500" />
                            </div>
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    {article?.title}
                                </Dialog.Title>
                                    <div className="flex flex-col text-justify items-center">
                                    <div className="mr-3 ">
                                        <img src={article?.thumbnail} style={{ objectFit: "cover", objectPosition: "center" }} className="mt-4 mb-3 w-[300px] h-[300px]" alt="Thumbnail" />
                                    </div>
                                    <div className="flex-1 leading-loose m-4">
                                        {article?.content}
                                    </div>
                                </div>
                                <button onClick={closeModal} className="rounded-md bg-[#FFAD42] m-3 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">close </button>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
        </>
    )
                  
    } 