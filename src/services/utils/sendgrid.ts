import sgMail from "@sendgrid/mail";
import { getCustomRepository } from "typeorm";
import { User } from "../../entities/User";
import { EmployeeRepository } from "../../repositories/EmployeeRepository";
import { UserRepository } from "../../repositories/UserRepository";
import { VisitantRepository } from "../../repositories/VisitantRepository";
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

interface IData {
  email: string;
  username: string;
  code: string;
  role: string;
  user: User;
}

const sendConfirmationToken = async (data: IData) => {
  const msg = {
    to: data.email,
    from: "caf.trt21@gmail.com",
    subject: "Confirmação de Senha",
    text: `Link para confirmação de senha`,
    html: `<h1>Olá ${data.username}</h1> 
            <p>Clique no link abaixo para o próximo passo do seu cadastro:</p> 
            <a target="_blank" href="${process.env.WEB_URL}/signup/confirmation?token=${data.code}&role=${data.role}"> Seguir com meu cadastro </a>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch(async (error) => {
      const userRepository = getCustomRepository(UserRepository);
      const visitantRepository = getCustomRepository(VisitantRepository);
      const employeeRepository = getCustomRepository(EmployeeRepository);

      data.role === "visitant"
        ? await visitantRepository.delete({ user_id: data.user.id })
        : await employeeRepository.delete({ user_id: data.user.id });
      await userRepository.delete(data.user.id);
      throw new Error(`${error.message}`);
    });
};

const sendCodeAccess = async (data: IData) => {
  const msg = {
    to: data.email,
    from: "caf.trt21@gmail.com",
    subject: "Código de Acesso",
    text: "Use essa senha de acesso para entrar no TRT",
    html: `
            <h1>Seja bem vindo ${data.username}!</h1> 
            <p>Para que você tenha acesso ao prédio, criamos um código de segurança para sua identificação!</p>
            <p>Não <strong>DIVULGE</strong> ou <strong>PERMITA</strong> que usem sua senha de acesso, ela é <strong>ÚNICA</strong> para identificação <strong>INDIVIDUAL SUA</strong>.</p>
            <h5>Você não precisa decorar essa senha, ela estará disponível pra você aqui neste email e na nossa <strong><h4><a href='${process.env.WEB_URL}' target="_blank">PLATAFORMA</a></h4></strong></h5>
            <h3>Código de Acesso</h3>
            <h2>${data.code}</h2>
            `,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Code Access sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

export { sendConfirmationToken, sendCodeAccess };
