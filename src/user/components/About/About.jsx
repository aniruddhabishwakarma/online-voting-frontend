import React from 'react'
import styles from './about.module.css'

const About = () => {
  return (
    <>
      <section className = {styles.about} >
      <div className={styles.parallax1}>

           <h2 className = {styles.h1}>To Make Voting Process Simpler</h2>
           <div className = {styles.info}>
            <h5 className = {styles.u}> Aniruddha Bishwakarma</h5>
            <h5 className = {styles.u}>Contact: 9864995686</h5>
            <h5 className = {styles.u}>Email: aniruddha.bishwakarma123@gmail.com</h5>
            
        </div>
           
        </div>
      </section>
    </>
  )
}

export default About