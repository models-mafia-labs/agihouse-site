"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { socials } from "../constants";
import { usePostHog } from "posthog-js/react";
import styles from "../styles";
import { footerVariants } from "../utils/motion";

export default function Footer() {
  const posthog = usePostHog();

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="show"
      className={`${styles.xPaddings} py-8 relative`}
    >
      <div className="footer-gradient" />
      <div className={`${styles.innerWidth} mx-auto flex flex-col gap-8`}>
        <div className="flex items-center justify-between flex-wrap gap-5">
          <h4 className="font-bold md:text-[40px] text-[34px] text-white">
            The fastest growing AGI community in India. 
          </h4>
          <Link
            onClick={() => {
              posthog.capture("user_clicked_join", {
                location: "footer",
              });
            }}
            href="/join"
            className="flex items-center h-fit py-4 px-6 bg-[#2A6BE5] rounded-[32px] gap-[12px]"
          >
            <img src="/logo.png" alt="arrow-right" className="w-6 h-6" />
            <span className="font-normal text-[16px] text-white">Join Now</span>
          </Link>
        </div>

        <div className="flex flex-col">
          <div className="mb-[50px] h-[2px] bg-white opacity-10" />

          <div className="flex items-center justify-between flex-wrap gap-4">
            <h4 className="font-extrabold text-[24px] text-white">AGI HOUSE</h4>
            <p className="font-normal text-[14px] text-white opacity-50">
              Copyright © {new Date().getFullYear()} AGI House India. All rights
              reserved.
            </p>

            <div className="flex gap-4">
              {socials.map((social) => (
                <Link
                  onClick={() => {
                    posthog.capture("user_clicked_social", {
                      social: social.name,
                      location: "footer",
                    });
                  }}
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={social.url}
                    alt={social.name}
                    className="w-[24px] h-[24px] object-contain"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
