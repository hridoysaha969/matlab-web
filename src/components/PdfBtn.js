import { useEffect, useState } from "react";
import Link from "next/link";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebase";
import classes from "@/styles/rewardPage.module.css";

function PdfBtn() {
  const [downloadURL, setDownloadURL] = useState("");

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const pdfRef = ref(storage, "pdf/roadmap_resources_hst.pdf");
        const downloadPDfUrl = await getDownloadURL(pdfRef);
        setDownloadURL(downloadPDfUrl);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchUrl();
  }, []);

  const handleDownloadPDF = () => {
    window.open(downloadURL, "_blank");
  };
  return (
    <button className={classes.download__btn} onClick={handleDownloadPDF}>
      Download
    </button>
  );
}

export default PdfBtn;
