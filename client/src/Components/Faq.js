
import React, { useState } from 'react';

const Faq = ({ faqs }) => {
    return (
        <div className="p-8">
            <div className="bg-white p-4 rounded-lg py-8 mt-12">
                <h4 className="text-4xl font-bold text-gray-800 tracking-widest uppercase text-center">FAQ</h4>
                <p className="text-center text-gray-600 text-sm mt-2">
                    Here are some of the frequently asked questions
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-12 px-2 xl:px-12 mt-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="flex space-x-8 mt-8">
                           
                            <div>
                                <h4 className="text-xl font-bold text-gray-700">{faq.question}</h4>
                                <p className="text-gray-600 my-2">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Set default value for faqs prop in case it's not provided
Faq.defaultProps = {
    faqs: [],
};

export default Faq;



