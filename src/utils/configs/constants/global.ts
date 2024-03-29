export const check_env = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

export const baseUrl = check_env ? `http://192.168.1.106:8080` : window.location.origin;

export const limitContents          = 9;
export const limitSliderContents    = 12
export const limitTableData: number = 10;
export const maxFileSize = 50;

export enum pagesName {
    sliders        = "اسلایدشو",
    posts          = "پست ها",
    users          = "کاربران",
    home           = "خانه",
    skills         = "مهارت ها",
    habits         = "عادات",
    habitLogs      = "اطلاعات عادات",
    userScors      = "امتیازات",
    selfEvaluation = "خودارزشیابی",
}

export enum userTab {
    skills          = 'توانمندی ها',
    habits          = 'عادات',
    habitLogs       = 'اطلاعات عادات',
    userScores      = 'امتیازات',
    selfEvaluation  = 'خودارزیابی'
}


export const  selfQuestionTabTitle = {
    1   : 'روابط عاطفی و خانوادگی',
    2   : 'وضعیت جسمانی',
    3   : 'کسب و کار',
    4   : 'توسعه مالی',
    5   : 'معنوی',
    6   : 'توسعه و رشد ذهنی',
    7   : 'تفریح و سبک زندگی',
    8   : 'عشق و تعلق خاطر'
}