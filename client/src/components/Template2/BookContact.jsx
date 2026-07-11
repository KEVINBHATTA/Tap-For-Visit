import React from 'react';
// import { RiContactsBook3Fill } from 'react-icons/ri';

function BookContact({formData}) {
const handleSaveContact = () => {
    const vCardData = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${formData?.fullName || "Anonymous"}`,
      `ORG:${formData?.company || ""}`,
      `TITLE:${formData?.job || ""}`,
      `TEL;TYPE=CELL:${formData?.phone || ""}`,
      `EMAIL;TYPE=INTERNET:${formData?.email || ""}`,
      `URL:${formData?.website || ""}`,
      `X-SOCIALPROFILE;type=linkedin:${formData?.linkedin || ""}`,
      `X-SOCIALPROFILE;type=instagram:${formData?.instagram || ""}`,
      `NOTE:${formData?.bio || ""}`,
      `ADR;TYPE=WORK:;;${formData?.location || ""};;;;`,
      "END:VCARD",
    ].join("\r\n");

    const blob = new Blob([vCardData], { type: "text/vcard;charset=utf-8;" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);

    const fileName = `${formData?.fullName?.replace(/\s+/g, "_") || "contact"}.vcf`;
    link.setAttribute("download", fileName);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className='Temp2-Btn-Section'>
<center>

      <div className='Temp2-Btn Glass-Morphism'>
        Book Me
        </div>
     

   
         <div className='Temp2-Btn Glass-Morphism'>
             <button onClick={handleSaveContact}>
          {/* <RiContactsBook3Fill id="Savecontact-icon" /> */}
        Save Contact
        </button>
        </div>
        
      
</center>
    </div>
  )
}
export default BookContact