import React from 'react'
import {Icon} from '../assets/icon/icons'
import { width } from '@fortawesome/free-brands-svg-icons/fa42Group';
export default function Footer() {
  const [submitEmail, setSubmitEmail] = React.useState("");
  const footerlist = [
    {
      header: "Information Use",
      information: ["Inspection Standard", "Usage Policy", "Penalty Policy", "Community Guidelines"]
    },
    {
      header: "Customer Support",
      information: ["Announcement", "Service Introduction", "Store Information", "Seller visit reception"]
    }
  ]

  const footerlist2 = ["About Us", "Partnership proposal", "Term of Use", "Sitemap", "Privacy Policy"]
  const TextOnHover = {
    fontWeight: "bold",
    fontSize: "30px",
  }
  return (
    <div className='Footercontainer container'>
      <div className='Footer1'>
        <div className='Footer_list1'>
          {footerlist.map((item, index) => (
            <div className='Footer_item' key={'header' + index}>
              <h3>{item.header}</h3>
              <div className='UL'>
                {item.information.map((item2, index2) => (
                  <li key={'link' + index2}>{item2}</li>
                ))}
              </div>

            </div>
          ))}
        </div>
        <div className='Footer_subcribe'>
          <div className='Footer_subcribe_header'>WHAT NEW  ON SUFY STYLES</div>
          <div className='Footer_subcribe_content'>
            <div className='Subcribe_header'>Sign up for exclusive early sale access and tailored new arrivals.</div>
            <div className='Subcribe_input'>
              <input placeholder='Enter your email' className='Subcribe_input_box' type="text" value={submitEmail} onChange={e => (setSubmitEmail(e.target.value))} />
              <button className='Subcribe_input_button'>Sign Up</button>
            </div>
            <div className='Subcribe_footer'>Opt out at any time by clicking Unsubscribe at the bottom of any of our emails. By signing up you agree with our <span>Terms & Conditions</span> <span>Privacy</span>, and <span>Cookie Policy</span></div>
          </div>
        </div>
      </div>
      <div className='Footer2'>
        <div className='Footer_list2'>
          {footerlist2.map((item, index) => (
            <div className='Item_Icon' key={index}>
              <div>{item}</div>
            </div>
          ))}
        </div >
        <div className='Footer_icon_List'>
          <div >
            {Icon.Instagram}
          </div>
          <div >
            {Icon.Facebook2}
          </div>
          <div >
            {Icon.Twitter}
          </div>
        </div>
      </div>
    </div>
  )
}
