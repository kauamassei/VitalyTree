export enum SelectedPage {
    Home = "home",
    Benefícios = "benefits",
    OurClasses = "ourclasses",
    ContactUs = "contactus",
    Login = "login",
    Register = "register"
    
  }

export interface BenefitType {
  icon: JSX.Element;
  title: string;
  description: string;
}

export interface ClassType {
  name: string;
  description?: string;
  image: string;
}