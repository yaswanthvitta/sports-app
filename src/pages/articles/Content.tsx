import { useEffect, useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react/jsx-runtime";


export interface Article {
    title:string;
  content:string;
  thumbnail:string;
}


export const  GetArticle = (id : number)  => {

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

            <button onClick={openModal} id="{article.id}">Read-More ...</button>

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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    {article?.title}
                                </Dialog.Title>
                                <div className="mt-2">
                                    <div>
                                    <img src={article?.thumbnail} style={{ objectFit: "cover", objectPosition: "center" }} className="w-full h-[200px]" />
                                    </div>
                                    <div>
                                        {article?.content}
                                    </div>
                                    
                                    <button onClick={closeModal}>close </button>

                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
        </>
    )
                  
    } 