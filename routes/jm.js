//  Variables I'll use throughout

exports.vars = {
  title: 'Jeremy Moritz: Software Engineer',
  headContent: '',
  cuHireDate: '2004-05-24',
  navLinks: [
    {
      href: 'index',
      title: 'Jeremy Moritz Home Page',
      faIcon: 'home',
      navText: 'Home'
    }, {
      href: 'examples',
      title: 'Example Sites',
      faIcon: 'list-alt',
      navText: 'Example Sites'
    }, {
      href: 'about',
      title: 'About Jeremy',
      faIcon: 'info-circle',
      navText: 'About'
    }, {
      href: 'contact',
      title: 'Contact Jeremy Moritz',
      faIcon: 'phone',
      navText: 'Contact'
    }
  ],
  skills: [
    {name: 'Javascript', abbr: 'javascript'},
    {name: 'PHP', abbr: 'php'},
    {name: 'NodeJS', abbr: 'node'},
    {name: 'KnockoutJS', abbr: 'knockout'},
    {name: 'Python', abbr: 'python'},
    {name: 'Bootstrap', abbr: 'bootstrap'},
    {name: 'HTML5', abbr: 'html5'},
    {name: 'CSS3', abbr: 'css3'},
    {name: 'Git', abbr: 'git'},
    {name: 'JQuery', abbr: 'jquery'},
    {name: 'Photoshop', abbr: 'photoshop'},
    {name: 'MySQL', abbr: 'mysql'}
  ],
  getSkill: function getSkill(skill) {  //  get skill object by reference to name or abbr
    var skillObj = null;
    this.skills.forEach(function checkSkill(s) {
      if ([s.abbr, s.name].indexOf(skill) > -1) {
        skillObj = s;
        return false;
      }
    });
    return skillObj;
  },
  skillWithLogo: function skillWithLogo(skill) {
    var sk = this.getSkill(skill);
    return sk ? sk.name + ' <img src="_img/logo_' + sk.abbr + '_sm.png" alt="' + sk.name + ' Logo">' : skill.charAt(0).toUpperCase() + skill.slice(1);
  },
  getAge: function getAge(dateString, padZeros, currentDate) { //  Return the age in years if given a dateString of the format 'YYYY-MM-DD' (optionally padded with zeros)
    var today = new Date(currentDate || new Date());
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (padZeros && padZeros % 1 === 0) { //  if padZeros is an integer...
      age = (Array(padZeros).join('0') + age).slice(-padZeros);
    }
    return age;
  },
  //  returns true if the user is on a mobile browser (phone, iPad, etc.)
  isMobile: function isMobile(userAgent) {
    // Array of known mobile user agents.  This list is from the 21 October 2010 WURFL File.  Most mobile devices send a pretty standard string that can be covered by one of these.  I believe I have found all the agents (as of the date above).  It's advised to periodically check this list against the WURFL file, available at: http://wurfl.sourceforge.net/ (though i don't know how to read that crazy-large xml file)
    var mobileAgents = ['240x320', 'acer', 'acoon', 'acs-', 'abacho', 'ahong', 'airness', 'alcatel', 'amoi', 'android', 'anywhereyougo.com', 'applewebkit/525', 'applewebkit/532', 'asus', 'audio', 'au-mic', 'avantogo', 'becker', 'benq', 'bilbo', 'bird', 'blackberry', 'blazer', 'bleu', 'cdm-', 'compal', 'coolpad', 'danger', 'dbtel', 'dopod', 'elaine', 'eric', 'etouch', 'fly ' , 'fly_', 'fly-', 'go.web', 'goodaccess', 'gradiente', 'grundig', 'haier', 'hedy', 'hitachi', 'htc', 'huawei', 'hutchison', 'inno', 'ipad', 'ipaq', 'ipod', 'jbrowser', 'kddi', 'kgt', 'kwc', 'lenovo', 'lg ', 'lg2', 'lg3', 'lg4', 'lg5', 'lg7', 'lg8', 'lg9', 'lg-', 'lge-', 'lge9', 'longcos', 'maemo', 'mercator', 'meridian', 'micromax', 'midp', 'mini', 'mitsu', 'mmm', 'mmp', 'mobi', 'mot-', 'moto', 'nec-', 'netfront', 'newgen', 'nexian', 'nf-browser', 'nintendo', 'nitro', 'nokia', 'nook', 'novarra', 'obigo', 'palm', 'panasonic', 'pantech', 'philips', 'phone', 'pg-', 'playstation', 'pocket', 'pt-', 'qc-', 'qtek', 'rover', 'sagem', 'sama', 'samu', 'sanyo', 'samsung', 'sch-', 'scooter', 'sec-', 'sendo', 'sgh-', 'sharp', 'siemens', 'sie-', 'softbank', 'sony', 'spice', 'sprint', 'spv', 'symbian', 'tablet', 'talkabout', 'tcl-', 'teleca', 'telit', 'tianyu', 'tim-', 'toshiba', 'tsm', 'up.browser', 'utec', 'utstar', 'verykool', 'virgin', 'vk-', 'voda', 'voxtel', 'vx', 'wap', 'wellco', 'wig browser', 'wii', 'windows ce', 'wireless', 'xda', 'xde', 'zte'];
    var isMobile = false;
    userAgent = userAgent.toLowerCase();
    for (var i = 0; i < mobileAgents.length; i++) {
      if (userAgent.indexOf(mobileAgents[i]) > -1) {  //  check user-agent to see if it's in the list
        isMobile = true;  //  if so, it's a mobile device
        break;
      }
    }
    return isMobile;
  }
};
