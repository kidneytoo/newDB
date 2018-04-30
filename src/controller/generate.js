var express = require('express');
var router = express.Router();
var { con } = require('../server');

router.get('/database', function (req, res, next) {
  const queries = [
    // "DROP TABLE IF EXISTS `bld_locates_in_fac`",
    "CREATE TABLE `bld_locates_in_fac` (\
      `bld_id` int(11) NOT NULL,\
      `faculty_id` char(2) NOT NULL,\
      PRIMARY KEY (`bld_id`,`faculty_id`),\
      UNIQUE KEY `bld_id` (`bld_id`),\
      UNIQUE KEY `faculty_id` (`faculty_id`),\
      CONSTRAINT `locates_bld_fk` FOREIGN KEY (`bld_id`) REFERENCES `building` (`bld_id`) ON DELETE CASCADE,\
      CONSTRAINT `locates_fac_fk` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`faculty_id`) ON DELETE CASCADE\
    )"
    // ,
    // "DROP TABLE IF EXISTS `building`",
    // "CREATE TABLE `building` (\
    //   `bld_id` int(11) NOT NULL AUTO_INCREMENT,\
    //   `bld_name` varchar(50) NOT NULL,\
    //   PRIMARY KEY (`bld_id`),\
    //   UNIQUE KEY `bld_name` (`bld_name`)\
    // )",
    // "DROP TABLE IF EXISTS `course`",
    // "CREATE TABLE `course` (\
    //   `cid` char(7) NOT NULL,\
    //   `cname` varchar(50) NOT NULL,\
    //   `credit` tinyint(4) NOT NULL,\
    //   PRIMARY KEY (`cid`),\
    //   UNIQUE KEY `cname` (`cname`)\
    // )",
    // "DROP TABLE IF EXISTS `department`",
    // "CREATE TABLE `department` (\
    //   `dep_id` int(11) NOT NULL AUTO_INCREMENT,\
    //   `faculty_id` char(2) NOT NULL,\
    //   `dep_name` varchar(50) NOT NULL,\
    //   PRIMARY KEY (`dep_id`,`faculty_id`),\
    //   UNIQUE KEY `dep_name` (`dep_name`),\
    //   KEY `dep_faculty_fkey` (`faculty_id`),\
    //   CONSTRAINT `dep_faculty_fkey` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`faculty_id`) ON DELETE CASCADE\
    // )",
    // "DROP TABLE IF EXISTS `faculty`",
    // "CREATE TABLE `faculty` (\
    //   `faculty_id` char(2) NOT NULL,\
    //   `faculty_name` varchar(50) NOT NULL,\
    //   PRIMARY KEY (`faculty_id`),\
    //   UNIQUE KEY `faculty_name` (`faculty_name`),\
    //   UNIQUE KEY `faculty_id_UNIQUE` (`faculty_id`)\
    // )",
    // "DROP TABLE IF EXISTS `person`",
    // "CREATE TABLE `person` (\
    //   `idno` char(13) NOT NULL,\
    //   `prefix` varchar(20) NOT NULL,\
    //   `fname` varchar(50) NOT NULL,\
    //   `lname` varchar(50) NOT NULL,\
    //   PRIMARY KEY (`idno`)\
    // )",
    // "INSERT INTO `person` VALUES ('1409901481788','Mr.','Rujikorn','Charakorn')",
    // "DROP TABLE IF EXISTS `person_belongs_to_dep`",
    // "CREATE TABLE `person_belongs_to_dep` (\
    //   `faculty_id` char(2) NOT NULL,\
    //   `dep_id` int(11) NOT NULL,\
    //   `idno` char(13) NOT NULL,\
    //   PRIMARY KEY (`faculty_id`,`dep_id`,`idno`),\
    //   UNIQUE KEY `idno` (`idno`),\
    //   KEY `dep_fkey` (`dep_id`),\
    //   CONSTRAINT `dep_fkey` FOREIGN KEY (`dep_id`) REFERENCES `department` (`dep_id`) ON DELETE CASCADE,\
    //   CONSTRAINT `faculty_fkey` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`faculty_id`) ON DELETE CASCADE,\
    //   CONSTRAINT `idno_fkey` FOREIGN KEY (`idno`) REFERENCES `person` (`idno`) ON DELETE CASCADE\
    // )",
    // "DROP TABLE IF EXISTS `prerequisite`",
    // "CREATE TABLE `prerequisite` (\
    //   `cid` char(7) NOT NULL,\
    //   `required_course` char(7) NOT NULL,\
    //   PRIMARY KEY (`cid`,`required_course`),\
    //   KEY `prereq_required_fk` (`required_course`),\
    //   CONSTRAINT `prereq_cid_fk` FOREIGN KEY (`cid`) REFERENCES `course` (`cid`) ON DELETE CASCADE,\
    //   CONSTRAINT `prereq_required_fk` FOREIGN KEY (`required_course`) REFERENCES `course` (`cid`) ON DELETE CASCADE\
    // )",
    // "DROP TABLE IF EXISTS `room`",
    // "CREATE TABLE `room` (\
    //   `room_id` varchar(5) NOT NULL,\
    //   `bld_id` int(11) NOT NULL,\
    //   PRIMARY KEY (`room_id`,`bld_id`),\
    //   UNIQUE KEY `room_id` (`room_id`),\
    //   UNIQUE KEY `bld_id` (`bld_id`),\
    //   CONSTRAINT `room_bld_fk` FOREIGN KEY (`bld_id`) REFERENCES `building` (`bld_id`) ON DELETE CASCADE\
    // )",
    // "DROP TABLE IF EXISTS `sec_use_room`",
    // "CREATE TABLE `sec_use_room` (\
    //   `cid` char(7) NOT NULL,\
    //   `sec_no` int(11) NOT NULL,\
    //   `room_id` varchar(5) NOT NULL,\
    //   `bld_id` int(11) NOT NULL,\
    //   PRIMARY KEY (`cid`,`sec_no`,`room_id`,`bld_id`),\
    //   KEY `sec_room_secid_fk` (`sec_no`),\
    //   KEY `sec_room_roomid_fk` (`room_id`),\
    //   KEY `sec_room_bldid_fk` (`bld_id`),\
    //   CONSTRAINT `sec_room_bldid_fk` FOREIGN KEY (`bld_id`) REFERENCES `building` (`bld_id`) ON DELETE CASCADE,\
    //   CONSTRAINT `sec_room_cid_fk` FOREIGN KEY (`cid`) REFERENCES `course` (`cid`) ON DELETE CASCADE,\
    //   CONSTRAINT `sec_room_roomid_fk` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`) ON DELETE CASCADE,\
    //   CONSTRAINT `sec_room_secid_fk` FOREIGN KEY (`sec_no`) REFERENCES `section` (`sec_no`) ON DELETE CASCADE\
    // )",
    // "DROP TABLE IF EXISTS `section`",
    // "CREATE TABLE `section` (\
    //   `sec_no` int(11) NOT NULL AUTO_INCREMENT,\
    //   `cid` char(7) NOT NULL,\
    //   `sem` tinyint(4) NOT NULL,\
    //   `year` int(11) NOT NULL,\
    //   PRIMARY KEY (`sec_no`,`cid`),\
    //   UNIQUE KEY `sec_no` (`sec_no`),\
    //   KEY `section_cid_fk` (`cid`),\
    //   CONSTRAINT `section_cid_fk` FOREIGN KEY (`cid`) REFERENCES `course` (`cid`) ON DELETE CASCADE\
    // )",
    // "DROP TABLE IF EXISTS `section_period`",
    // "CREATE TABLE `section_period` (\
    //   `sec_no` int(11) NOT NULL,\
    //   `cid` char(7) NOT NULL,\
    //   `start` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\
    //   `end` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',\
    //   PRIMARY KEY (`sec_no`,`cid`),\
    //   KEY `period_cid_fk` (`cid`),\
    //   CONSTRAINT `period_cid_fk` FOREIGN KEY (`cid`) REFERENCES `course` (`cid`) ON DELETE CASCADE,\
    //   CONSTRAINT `period_secid_fk` FOREIGN KEY (`sec_no`) REFERENCES `section` (`sec_no`) ON DELETE CASCADE\
    // )",
    // "DROP TABLE IF EXISTS `student`",
    // "CREATE TABLE `student` (\
    //   `idno` char(13) NOT NULL,\
    //   `sid` char(10) NOT NULL,\
    //   PRIMARY KEY (`sid`),\
    //   UNIQUE KEY `idno` (`idno`),\
    //   CONSTRAINT `student_personal_id` FOREIGN KEY (`idno`) REFERENCES `person` (`idno`) ON DELETE CASCADE\
    // )",
    // "INSERT INTO `student` VALUES ('1409901481788','5830462321')",
    // "DROP TABLE IF EXISTS `teacher`",
    // "CREATE TABLE `teacher` (\
    //   `idno` char(13) NOT NULL,\
    //   `tid` char(10) NOT NULL,\
    //   PRIMARY KEY (`tid`),\
    //   UNIQUE KEY `idno` (`idno`),\
    //   CONSTRAINT `teacher_personal_id` FOREIGN KEY (`idno`) REFERENCES `person` (`idno`) ON DELETE CASCADE\
    // )",
    // "INSERT INTO `teacher` VALUES ('1409901481788','5830462321')",
    // "DROP TABLE IF EXISTS `teacher_is_head_course`",
    // "CREATE TABLE `teacher_is_head_course` (\
    //   `cid` char(7) NOT NULL,\
    //   `tid` char(10) NOT NULL,\
    //   PRIMARY KEY (`cid`),\
    //   UNIQUE KEY `cid` (`cid`),\
    //   UNIQUE KEY `tid` (`tid`),\
    //   CONSTRAINT `is_head_cid_fk` FOREIGN KEY (`cid`) REFERENCES `course` (`cid`) ON DELETE CASCADE\
    // )",
    // "DROP TABLE IF EXISTS `teacher_supervises_student`",
    // "CREATE TABLE `teacher_supervises_student` (\
    //   `tid` char(10) NOT NULL,\
    //   `sid` char(10) NOT NULL,\
    //   PRIMARY KEY (`tid`,`sid`),\
    //   KEY `supervises_student_fk` (`sid`),\
    //   CONSTRAINT `supervises_student_fk` FOREIGN KEY (`sid`) REFERENCES `student` (`sid`) ON DELETE CASCADE,\
    //   CONSTRAINT `supervises_teacher_fk` FOREIGN KEY (`tid`) REFERENCES `teacher` (`tid`) ON DELETE CASCADE\
    // )",
    // "DROP TABLE IF EXISTS `teacher_teaches_section`",
    // "CREATE TABLE `teacher_teaches_section` (\
    //   `tid` char(10) NOT NULL,\
    //   `cid` char(7) NOT NULL,\
    //   `sec_no` int(11) NOT NULL,\
    //   PRIMARY KEY (`tid`,`cid`,`sec_no`),\
    //   KEY `teaches_cid_fk` (`cid`),\
    //   KEY `teaches_secid_fk` (`sec_no`),\
    //   CONSTRAINT `teaches_cid_fk` FOREIGN KEY (`cid`) REFERENCES `course` (`cid`) ON DELETE CASCADE,\
    //   CONSTRAINT `teaches_secid_fk` FOREIGN KEY (`sec_no`) REFERENCES `section` (`sec_no`) ON DELETE CASCADE,\
    //   CONSTRAINT `teaches_tid_fk` FOREIGN KEY (`tid`) REFERENCES `teacher` (`tid`) ON DELETE CASCADE\
    // )"
  ];

  const promises = queries.map((query, index) => {
    return new Promise((resolve, reject) => {
      mysql.query(query, function (err, result) {
        if (err) reject(err);
        else resolve();
      });
    });
  });

  Promise.all(promises)
    .then(() => res.send({ result: 'SUCCESS' }))
    .catch(err => res.send({ result: err }));

});

// router.get('/data', function (req, res) {
//   const queries = [
//     // faculties
//     "insert into faculties values (21, 'FACULTY OF ENGINEERING')",
//     "insert into faculties values (22, 'FACULTY OF ARTS')",
//     "insert into faculties values (23, 'FACULTY OF SCIENCE')",
//     "insert into faculties values (24, 'FACULTY OF POLITICAL SCIENCE')",
//     "insert into faculties values (25, 'FACULTY OF ARCHITECTURE')",
//     "insert into faculties values (26, 'FACULTY OF COMMERCE AND ACCOUNTANCY')",
//     "insert into faculties values (27, 'FACULTY OF EDUCATION')",
//     "insert into faculties values (28, 'FACULTY OF COMMUNICATION ARTS')",
//     "insert into faculties values (29, 'FACULTY OF ECONOMICS')",
//     "insert into faculties values (30, 'FACULTY OF MEDICINE')",
//     "insert into faculties values (31, 'FACULTY OF VETERINARY SCIENCE')",
//     "insert into faculties values (32, 'FACULTY OF DENTISTRY')",
//     "insert into faculties values (33, 'FACULTY OF PHARMACEUTICAL SCIENCES')",
//     "insert into faculties values (34, 'FACULTY OF LAW')",
//     "insert into faculties values (35, 'FACULTY OF FINE AND APPLIED ARTS')",
//     "insert into faculties values (36, 'FACULTY OF NURSING')",
//     "insert into faculties values (37, 'FACULTY OF ALLIED HEALTH SCIENCES')",
//     "insert into faculties values (38, 'FACULTY OF PSYCHOLOGY')",
//     "insert into faculties values (39, 'FACULTY OF SPORTS SCIENCE')",
//     "insert into faculties values (55, 'CULI')",
//     // departments
//     "insert into departments values (21, 1, 'Civil Engineering')",
//     "insert into departments values (21, 2, 'Electrical Engineering')",
//     "insert into departments values (21, 3, 'Mechanical Engineering')",
//     "insert into departments values (21, 4, 'Naval Architecture and Marine Engineering')",
//     "insert into departments values (21, 5, 'Automotive Engineering')",
//     "insert into departments values (21, 6, 'Industrial Engineering')",
//     "insert into departments values (21, 7, 'Chemical Engineering')",
//     "insert into departments values (21, 8, 'Georesources Engineering')",
//     "insert into departments values (21, 9, 'Petroleum Engineering')",
//     "insert into departments values (21, 10, 'Environmental Engineering')",
//     "insert into departments values (21, 11, 'Survey Engineering')",
//     "insert into departments values (21, 12, 'Metallurgical and Materials Engineering')",
//     "insert into departments values (21, 13, 'Computer Engineering')",
//     "insert into departments values (21, 14, 'Nano - Engineering')",
//     "insert into departments values (21, 15, 'Automotive Design and Manufacturing Engineering')",
//     "insert into departments values (21, 16, 'Aerospace Engineering')",
//     "insert into departments values (21, 17, 'Information and Communication Engineering')",
//     // other faculties departments
//     "insert into departments values (39, 1, 'SPORTS SCIENCE')",
//     "insert into departments values (55, 1, 'CULI')",
//     // courses
//     "insert into courses values ('2103106', 'ENG DRAWING', 3, 21)",
//     "insert into courses values ('2301107', 'CALCULUS I', 3, 21)",
//     "insert into courses values ('2302127', 'GEN CHEM', 3, 23)",
//     "insert into courses values ('2302163', 'GEN CHEM LAB', 1, 23)",
//     "insert into courses values ('2304107', 'GEN PHYS I', 3, 23)",
//     "insert into courses values ('2304183', 'GEN PHYS LAB I', 1, 23)",
//     "insert into courses values ('5500111', 'EXP ENG I', 3, 55)",
//     "insert into courses values ('2100111', 'EXPL ENG WORLD', 3, 21)",
//     "insert into courses values ('2109101', 'ENG MATERIALS', 3, 21)",
//     "insert into courses values ('2110101', 'COMP PROG', 3, 21)",
//     "insert into courses values ('2301108', 'CALCULUS I', 3, 23)",
//     "insert into courses values ('2304108', 'GEN PHYS II', 3, 23)",
//     "insert into courses values ('2304184', 'GEN PHYS LAB II', 1, 23)",
//     "insert into courses values ('2313213', 'DIGITAL PHOTO', 3, 23)",
//     "insert into courses values ('5500112', 'EXP ENG I', 3, 55)",
//     "insert into courses values ('2110200', 'DISCRETE STRUC', 3, 21)",
//     "insert into courses values ('2110215', 'PROG METH I', 3, 21)",
//     "insert into courses values ('2110221', 'COMP ENG ESS', 3, 21)",
//     "insert into courses values ('2110251', 'DIG COMP LOGIC', 3, 21)",
//     "insert into courses values ('2110253', 'COMP ELEC INTF', 3, 21)",
//     "insert into courses values ('2110263', 'DIG LOGIC LAB I', 1, 21)",
//     "insert into courses values ('3401124', 'INTRO IP LAW', 3, 34)",
//     "insert into courses values ('2110201', 'COMP ENG MATH', 3, 21)",
//     "insert into courses values ('2110211', 'INTRO DATA STRUCT', 3, 21)",
//     "insert into courses values ('2110254', 'DIG DESIGN VER', 3, 21)",
//     "insert into courses values ('2110265', 'DIG DESIGN LAB I', 1, 21)",
//     "insert into courses values ('2603284', 'STAT PHYS SCIENCE', 3, 26)",
//     "insert into courses values ('5500208', 'COM PRES SKIL', 3, 55)",
//     "insert into courses values ('2110313', 'OS SYS PROG', 3, 21)",
//     "insert into courses values ('2110316', 'PROG LANG PRIN', 3, 21)",
//     "insert into courses values ('2110327', 'ALGORITHM DESIGN', 3, 21)",
//     "insert into courses values ('2110352', 'COMP SYS ARCH', 3, 21)",
//     "insert into courses values ('2110363', 'HW SYN LAB I', 1, 21)",
//     "insert into courses values ('2110482', 'HIGH TECH', 3, 21)",
//     "insert into courses values ('2605311', 'ENT PRIN MKTG', 3, 26)",
//     "insert into courses values ('2110318', 'DIS SYS ESSEN', 1, 21)",
//     "insert into courses values ('2110332', 'SYS ANALYSIS DSGN', 3, 21)",
//     "insert into courses values ('2110413', 'COMP SECURITY', 3, 21)",
//     "insert into courses values ('2110422', 'DB MGT SYS DESIGN', 3, 21)",
//     "insert into courses values ('2110471', 'COMP NETWORK I', 3, 21)",
//     "insert into courses values ('3904205', 'SAFETY LIFE', 3, 39)",
//     "insert into courses values ('5500308', 'TECH WRIT ENG', 3, 21)",
//     // section (not use in presentation)
//     "insert into sections values ('2103106', 1, 2015, 1, 100, null, null)",
//     "insert into sections values ('2301107', 1, 2015, 1, 100, null, null)",
//     "insert into sections values ('2302127', 1, 2015, 1, 100, null, null)",
//     "insert into sections values ('2302163', 1, 2015, 1, 100, null, null)",
//     "insert into sections values ('2304107', 1, 2015, 1, 100, null, null)",
//     "insert into sections values ('2304183', 1, 2015, 1, 100, null, null)",
//     "insert into sections values ('5500111', 1, 2015, 1, 100, null, null)",
//     "insert into sections values ('2100111', 1, 2015, 2, 100, null, null)",
//     "insert into sections values ('2109101', 1, 2015, 2, 100, null, null)",
//     "insert into sections values ('2110101', 1, 2015, 2, 100, null, null)",
//     "insert into sections values ('2301108', 1, 2015, 2, 100, null, null)",
//     "insert into sections values ('2304108', 1, 2015, 2, 100, null, null)",
//     "insert into sections values ('2304184', 1, 2015, 2, 100, null, null)",
//     "insert into sections values ('2313213', 1, 2015, 2, 100, null, null)",
//     "insert into sections values ('5500112', 1, 2015, 2, 100, null, null)",
//     "insert into sections values ('2110200', 1, 2016, 1, 100, null, null)",
//     "insert into sections values ('2110215', 1, 2016, 1, 100, null, null)",
//     "insert into sections values ('2110221', 1, 2016, 1, 100, null, null)",
//     "insert into sections values ('2110251', 1, 2016, 1, 100, null, null)",
//     "insert into sections values ('2110253', 1, 2016, 1, 100, null, null)",
//     "insert into sections values ('2110263', 1, 2016, 1, 100, null, null)",
//     "insert into sections values ('3401124', 1, 2016, 1, 100, null, null)",
//     "insert into sections values ('2110201', 1, 2016, 2, 100, null, null)",
//     "insert into sections values ('2110211', 1, 2016, 2, 100, null, null)",
//     "insert into sections values ('2110254', 1, 2016, 2, 100, null, null)",
//     "insert into sections values ('2110265', 1, 2016, 2, 100, null, null)",
//     "insert into sections values ('2603284', 1, 2016, 2, 100, null, null)",
//     "insert into sections values ('5500208', 1, 2016, 2, 100, null, null)",
//     "insert into sections values ('2110313', 1, 2017, 1, 100, null, null)",
//     "insert into sections values ('2110316', 1, 2017, 1, 100, null, null)",
//     "insert into sections values ('2110327', 1, 2017, 1, 100, null, null)",
//     "insert into sections values ('2110352', 1, 2017, 1, 100, null, null)",
//     "insert into sections values ('2110363', 1, 2017, 1, 100, null, null)",
//     "insert into sections values ('2110482', 1, 2017, 1, 100, null, null)",
//     "insert into sections values ('2605311', 1, 2017, 1, 100, null, null)",
//     // section (use in presentation)
//     "insert into sections values ('2110318', 1, 2017, 2, 60, null, null)",
//     "insert into sections values ('2110318', 2, 2017, 2, 60, null, null)",
//     "insert into sections values ('2110332', 1, 2017, 2, 40, null, null)",
//     "insert into sections values ('2110332', 2, 2017, 2, 40, null, null)",
//     "insert into sections values ('2110332', 3, 2017, 2, 40, null, null)",
//     "insert into sections values ('2110413', 1, 2017, 2, 40, null, null)",
//     "insert into sections values ('2110422', 1, 2017, 2, 40, null, null)",
//     "insert into sections values ('2110422', 2, 2017, 2, 40, null, null)",
//     "insert into sections values ('2110422', 3, 2017, 2, 40, null, null)",
//     "insert into sections values ('2110471', 1, 2017, 2, 30, null, null)",
//     "insert into sections values ('2110471', 2, 2017, 2, 30, null, null)",
//     "insert into sections values ('2110471', 3, 2017, 2, 30, null, null)",
//     "insert into sections values ('2110471', 4, 2017, 2, 30, null, null)",
//     "insert into sections values ('3904205', 1, 2017, 2, 40, null, null)",
//     "insert into sections values ('5500308', 1, 2017, 2, 200, null, null)",
//     // time_slot (not use in presentation)
//     "insert into time_slots values ('2103106', 1, 2015, 1, 1, 'monday', null, null)",
//     "insert into time_slots values ('2301107', 1, 2015, 1, 1, 'monday', null, null)",
//     "insert into time_slots values ('2302127', 1, 2015, 1, 1, 'monday', null, null)",
//     "insert into time_slots values ('2302163', 1, 2015, 1, 1, 'monday', null, null)",
//     "insert into time_slots values ('2304107', 1, 2015, 1, 1, 'monday', null, null)",
//     "insert into time_slots values ('2304183', 1, 2015, 1, 1, 'monday', null, null)",
//     "insert into time_slots values ('5500111', 1, 2015, 1, 1, 'monday', null, null)",
//     "insert into time_slots values ('2100111', 1, 2015, 2, 1, 'monday', null, null)",
//     "insert into time_slots values ('2109101', 1, 2015, 2, 1, 'monday', null, null)",
//     "insert into time_slots values ('2110101', 1, 2015, 2, 1, 'monday', null, null)",
//     "insert into time_slots values ('2301108', 1, 2015, 2, 1, 'monday', null, null)",
//     "insert into time_slots values ('2304108', 1, 2015, 2, 1, 'monday', null, null)",
//     "insert into time_slots values ('2304184', 1, 2015, 2, 1, 'monday', null, null)",
//     "insert into time_slots values ('2313213', 1, 2015, 2, 1, 'monday', null, null)",
//     "insert into time_slots values ('5500112', 1, 2015, 2, 1, 'monday', null, null)",
//     "insert into time_slots values ('2110200', 1, 2016, 1, 1, 'monday', null, null)",
//     "insert into time_slots values ('2110215', 1, 2016, 1, 1, 'monday', null, null)",
//     "insert into time_slots values ('2110221', 1, 2016, 1, 1, 'monday', null, null)",
//     "insert into time_slots values ('2110251', 1, 2016, 1, 1, 'monday', null, null)",
//     "insert into time_slots values ('2110253', 1, 2016, 1, 1, 'monday', null, null)",
//     "insert into time_slots values ('2110263', 1, 2016, 1, 1, 'monday', null, null)",
//     "insert into time_slots values ('3401124', 1, 2016, 1, 1, 'monday', null, null)",
//     "insert into time_slots values ('2110201', 1, 2016, 2, 1, 'monday', null, null)",
//     "insert into time_slots values ('2110211', 1, 2016, 2, 1, 'monday', null, null)",
//     "insert into time_slots values ('2110254', 1, 2016, 2, 1, 'monday', null, null)",
//     "insert into time_slots values ('2110265', 1, 2016, 2, 1, 'monday', null, null)",
//     "insert into time_slots values ('2603284', 1, 2016, 2, 1, 'monday', null, null)",
//     "insert into time_slots values ('5500208', 1, 2016, 2, 1, 'monday', null, null)",
//     "insert into time_slots values ('2110313', 1, 2017, 1, 1, 'monday', null, null)",
//     "insert into time_slots values ('2110316', 1, 2017, 1, 1, 'monday', null, null)",
//     "insert into time_slots values ('2110327', 1, 2017, 1, 1, 'monday', null, null)",
//     "insert into time_slots values ('2110352', 1, 2017, 1, 1, 'monday', null, null)",
//     "insert into time_slots values ('2110363', 1, 2017, 1, 1, 'monday', null, null)",
//     "insert into time_slots values ('2110482', 1, 2017, 1, 1, 'monday', null, null)",
//     "insert into time_slots values ('2605311', 1, 2017, 1, 1, 'monday', null, null)",
//     // time_slot (not finish yet)
//     "insert into time_slots values ('2110318', 1, 2017, 2, 1, 'wednesday', '08:00:00', '09:00:00')",
//     "insert into time_slots values ('2110318', 2, 2017, 2, 1, 'friday', '08:00:00', '09:00:00')",
//     "insert into time_slots values ('2110332', 1, 2017, 2, 1, 'tuesday', '09:30:00', '11:00:00')",
//     "insert into time_slots values ('2110332', 1, 2017, 2, 2, 'thursday', '09:30:00', '11:00:00')",
//     "insert into time_slots values ('2110332', 2, 2017, 2, 1, 'tuesday', '09:30:00', '11:00:00')",
//     "insert into time_slots values ('2110332', 2, 2017, 2, 2, 'thursday', '09:30:00', '11:00:00')",
//     "insert into time_slots values ('2110332', 3, 2017, 2, 1, 'tuesday', '09:30:00', '11:00:00')",
//     "insert into time_slots values ('2110332', 3, 2017, 2, 2, 'thursday', '09:30:00', '11:00:00')",
//     "insert into time_slots values ('2110413', 1, 2017, 2, 1, 'thursday', '13:00:00', '16:00:00')",
//     "insert into time_slots values ('2110422', 1, 2017, 2, 1, 'tuesday', '08:00:00', '09:30:00')",
//     "insert into time_slots values ('2110422', 1, 2017, 2, 2, 'thursday', '08:00:00', '09:30:00')",
//     "insert into time_slots values ('2110422', 2, 2017, 2, 1, 'tuesday', '08:00:00', '09:30:00')",
//     "insert into time_slots values ('2110422', 2, 2017, 2, 2, 'thursday', '08:00:00', '09:30:00')",
//     "insert into time_slots values ('2110422', 3, 2017, 2, 1, 'tuesday', '08:00:00', '09:30:00')",
//     "insert into time_slots values ('2110422', 3, 2017, 2, 2, 'thursday', '08:00:00', '09:30:00')",
//     "insert into time_slots values ('2110471', 1, 2017, 2, 1, 'wednesday', '09:30:00', '11:30:00')",
//     "insert into time_slots values ('2110471', 1, 2017, 2, 2, 'monday', '09:00:00', '11:00:00')",
//     "insert into time_slots values ('2110471', 2, 2017, 2, 1, 'wednesday', '09:30:00', '11:30:00')",
//     "insert into time_slots values ('2110471', 2, 2017, 2, 2, 'monday', '11:00:00', '13:00:00')",
//     "insert into time_slots values ('2110471', 3, 2017, 2, 1, 'wednesday', '09:30:00', '11:30:00')",
//     "insert into time_slots values ('2110471', 3, 2017, 2, 2, 'tuesday', '13:00:00', '15:00:00')",
//     "insert into time_slots values ('2110471', 4, 2017, 2, 1, 'wednesday', '09:30:00', '11:30:00')",
//     "insert into time_slots values ('2110471', 4, 2017, 2, 2, 'wednesday', '13:00:00', '15:00:00')",
//     "insert into time_slots values ('3904205', 1, 2017, 2, 1, 'tuesday', '13:00:00', '16:00:00')",
//     "insert into time_slots values ('5500308', 1, 2017, 2, 1, 'friday', '09:00:00', '12:00:00')",
//     // instructors
//     "insert into instructors values ('1', '1', 'Ajarn 1', '123456', '21', '13')",
//     "insert into instructors values ('2', '2', 'Ajarn 2', '123456', '21', '13')",
//     "insert into instructors values ('3', '3', 'Ajarn 3', '123456', '21', '13')",
//     "insert into instructors values ('4', '4', 'Ajarn 4', '123456', '21', '13')",
//     "insert into instructors values ('5', '5', 'Ajarn 5', '123456', '21', '13')",
//     "insert into instructors values ('6', '6', 'Ajarn 6', '123456', '21', '13')",
//     "insert into instructors values ('7', '7', 'Ajarn 7', '123456', '21', '13')",
//     "insert into instructors values ('8', '8', 'Ajarn 8', '123456', '21', '13')",
//     "insert into instructors values ('9', '9', 'Ajarn 9', '123456', '21', '13')",
//     "insert into instructors values ('10', '10', 'Ajarn 10', '123456', '21', '13')",
//     "insert into instructors values ('11', '11', 'Ajarn 11', '123456', '21', '13')",
//     "insert into instructors values ('12', '12', 'Ajarn 12', '123456', '21', '13')",
//     "insert into instructors values ('13', '13', 'Ajarn 13', '123456', '21', '13')",
//     "insert into instructors values ('14', '14', 'Ajarn 14', '123456', '39', '1')",
//     "insert into instructors values ('15', '15', 'Ajarn 15', '123456', '21', '13')",
//     // teach
//     "insert into teach values ('2110318', 1, 2017, 2, 1)",
//     "insert into teach values ('2110318', 2, 2017, 2, 2)",
//     "insert into teach values ('2110332', 1, 2017, 2, 3)",
//     "insert into teach values ('2110332', 2, 2017, 2, 4)",
//     "insert into teach values ('2110332', 3, 2017, 2, 5)",
//     "insert into teach values ('2110413', 1, 2017, 2, 6)",
//     "insert into teach values ('2110422', 1, 2017, 2, 7)",
//     "insert into teach values ('2110422', 2, 2017, 2, 8)",
//     "insert into teach values ('2110422', 3, 2017, 2, 9)",
//     "insert into teach values ('2110471', 1, 2017, 2, 10)",
//     "insert into teach values ('2110471', 2, 2017, 2, 11)",
//     "insert into teach values ('2110471', 3, 2017, 2, 12)",
//     "insert into teach values ('2110471', 4, 2017, 2, 13)",
//     "insert into teach values ('3904205', 1, 2017, 2, 14)",
//     "insert into teach values ('5500308', 1, 2017, 2, 15)",
//     // buildings
//     "insert into buildings values (1, 21, 'Building 1', null)",
//     "insert into buildings values (2, 21, 'Building 2', null)",
//     "insert into buildings values (3, 21, 'Building 3', null)",
//     "insert into buildings values (4, 21, 'Building 4', null)",
//     "insert into buildings values (5, 21, 'Building 100 years', null)",
//     // rooms
//     "insert into rooms values (1, '1', 1, 100)",
//     "insert into rooms values (1, '2', 1, 100)",
//     "insert into rooms values (2, '1', 1, 100)",
//     "insert into rooms values (2, '2', 1, 100)",
//     "insert into rooms values (3, '1', 1, 100)",
//     "insert into rooms values (3, '2', 1, 100)",
//     "insert into rooms values (4, '1', 1, 100)",
//     "insert into rooms values (4, '2', 1, 100)",
//     "insert into rooms values (5, '1', 1, 100)",
//     "insert into rooms values (5, '2', 1, 100)",
//     // fees
//     "insert into fees values (1, 'Education Fee', '21000', '2015', null, 21)",
//     "insert into fees values (2, 'Additional Fee', '50000', '2015', 14, 21)",
//     "insert into fees values (3, 'Additional Fee', '50000', '2015', 15, 21)",
//     "insert into fees values (4, 'Additional Fee', '50000', '2015', 16, 21)",
//     "insert into fees values (5, 'Additional Fee', '50000', '2015', 17, 21)",
//     // pay
//     // students
//     "insert into undergrad_students values ('5831057021', 3, '2019-06-01 00:00:00')",
//   ];
//
//   const promises = queries.map(query => {
//     return new Promise((resolve, reject) => {
//       mysql.query(query, (err, result) => {
//         if(err) reject(err);
//         else resolve();
//       });
//     });
//   });
//
//   Promise.all(promises)
//     .then(() => res.send({ result: 'SUCCESS' }))
//     .catch(err => res.send({ result: err }));
// });

module.exports = router;
