
import React from 'react'
import Checkout from './checkout'
import { LuCheckCircle2 } from 'react-icons/lu'


const Price = () => {

    const prices=[
        {
            title:"Basic Plan",
            description:"Get Basic Plan",
            benfitid:[
                "Improve Productivy",
                  "Const Saving",
                   "Improve Communication"
            ],
            amount:20,
            priceId:"price_1Q5Z0301P3LearWwr2qsCGgZ"
        },
          {
            title:"Enterprise",
            description:"Get Enterprise Plan",
            benfitid:[
                "Improve Productivy",
                  "Const Saving",
                   "Improve Communication"
            ],
            amount:10,
            priceId:"price_1Q5Z0K01P3LearWwt3KAyY69"
        },
        {
            title:"unlimited",
            description:"Get unlimited Plan",
            benfitid:[
                "Improve Productivy",
                  "Const Saving",
                   "Improve Communication"
            ],
            amount:50,
            priceId:"price_1Q5Z0d01P3LearWwBA6qXsUf"
        }
    ]
    

  return (
   <div>


<div className='grid grid-cols-1 p-8 md:p-10 lg:p-12 md:grid-cols-2 lg:grid-cols-3 gap-5'>
  {prices.map((price, index) => {
    return (
      <div key={index} className="border rounded-md p-5 space-y-5 transition-transform transform hover:scale-105">
        
        <div className='space-y-3'>
          <h1 className='text-2xl md:text-3xl font-bold'>{price.title}</h1>
          <h1 className='text-xl md:text-2xl font-bold'>{price.amount}$</h1>
          <p className='text-sm text-gray-400'>{price.description}</p>
        </div>

        <div>
          {price.benfitid.map((benfit, index) => {
            return (
              <div key={index} className='flex items-center gap-2'>
                <LuCheckCircle2 />
                <h1 className='text-sm text-gray-400'>{benfit}</h1>
              </div>
            );
          })}
        </div>
        
        <Checkout priceId={price.priceId} />
      </div>
    );
  })}
</div>


   </div>
  )
}

export default Price