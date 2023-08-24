import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useRouter } from 'next/router'
import PDFIcon from './PDFIcon';

export default function RematriculaForm({ rematricula, setRematricula }) {
  const [AceiteMatricula, setAceiteMatricula] = useState('0');
  const [RegimeMatricula, setRegimeMatricula] = useState(null);
  const [ParcelamentoCota, setParcelamentoCota] = useState('0');
  const [AceiteContrato, setAceiteContrato] = useState(Boolean);
  const [ip, setIP] = useState('');
  const router = useRouter()


  const link = 'https://cambauba.org.br/matricula_edital_interno/contratos/Contrato%20Renova%C3%A7%C3%A3o%202023%20-%20Wpensar.pdf'
  // Similar ao componentDidMount e componentDidUpdate:


  function IsRespFinan(usuario) {
    if (usuario.matricula.cpfrespfinan == usuario.cpf) {
      return true
    }

    return false
  }

  function IsEntranteDeSegmento(usuario) {

    if (usuario.matricula.turma == '901' ||
      usuario.matricula.turma == '902' ||
      usuario.matricula.turma == '501' ||
      usuario.matricula.turma == '502' ||
      usuario.matricula.turma == 'Pré-Escola II') {
      return true
    }
  }
  function GetPretendida(usuario) {
    if (usuario.matricula.turma == 'Berçário II') {
      return 'Maternal I'
    }
    if (usuario.matricula.turma == 'Maternal I-A' || usuario.matricula.turma == 'Maternal I-B') {
      return 'Maternal II'
    }
    if (usuario.matricula.turma == 'Maternal II') {
      return 'Pré-Escola I'
    }
    if (usuario.matricula.turma == 'Pré-Escola I') {
      return 'Pré-Escola II'
    }
    if (usuario.matricula.turma == 'Pré-Escola II') {
      return '1º Ano'
    }
    if (usuario.matricula.turma == '101' || usuario.matricula.turma == '102') {
      return '2º Ano'
    }
    if (usuario.matricula.turma == '201' || usuario.matricula.turma == '202') {
      return '3º Ano'
    }
    if (usuario.matricula.turma == '301' || usuario.matricula.turma == '302') {
      return '4º Ano'
    }
    if (usuario.matricula.turma == '401' || usuario.matricula.turma == '402') {
      return '5º Ano'
    }
    if (usuario.matricula.turma == '501' || usuario.matricula.turma == '502') {
      return '6º Ano'
    }
    if (usuario.matricula.turma == '601' || usuario.matricula.turma == '602' || usuario.matricula.turma == '603') {
      return '7º Ano'
    }
    if (usuario.matricula.turma == '701' || usuario.matricula.turma == '702') {
      return '8º Ano'
    }
    if (usuario.matricula.turma == '801' || usuario.matricula.turma == '802') {
      return '9º Ano'
    }
    if (usuario.matricula.turma == '901' || usuario.matricula.turma == '902') {
      return '1ª Série'
    }
    if (usuario.matricula.turma == '1101' || usuario.matricula.turma == '1102') {
      return '2ª Série'
    }
    if (usuario.matricula.turma == '1201' || usuario.matricula.turma == '1202') {
      return '3ª Série'
    }

    return 'Nenhuma série pretendida'
  }


  const getIP = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    setIP(res.data.IPv4)
  }

  useEffect(() => {
    getIP()
  }, [])

  function IsEducacaoInfantil(usuario) {
    if (
      usuario.matricula.turma == 'Pré-Escola I' ||
      usuario.matricula.turma == 'Maternal I' ||
      usuario.matricula.turma == 'Maternal I-A' ||
      usuario.matricula.turma == 'Maternal I-B' ||
      usuario.matricula.turma == 'Maternal II' ||
      usuario.matricula.turma == 'Berçário II') {
      return true
    }

    return false
  }

  function isEmptyObject(obj) {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        return false;
      }
    }
    return true;
  }

  function onIntegralValueChange(event) {
    setRegimeMatricula(event.target.value);
  }

  function onAceiteMatriculaValueChange(event) {
    setAceiteMatricula(event.target.value)
  }

  function onAceiteContratoValueChange(event) {
    setAceiteContrato(event.target.checked)
  }

  function onParcelamentoValueChange(event) {
    setParcelamentoCota(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const current = new Date();
    
    const data = {
      matricula: rematricula,
      aceite_matricula: AceiteMatricula,
      regime: RegimeMatricula,
      parcelamento_cota: ParcelamentoCota,
      aceite_contrato: AceiteContrato,
      date: current,
      user_ip: ip,
      pretendida: GetPretendida(rematricula),
    }

    const JSONdata = JSON.stringify(data)

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    const response = await fetch('/api/save_aceite', options)

    const result = await response.json()

    setRematricula({})

    router.push(result.relatorio.username)
  }

  if (isEmptyObject(rematricula))
    return (<h1>Erro desconhecido</h1>)

  return (
    <div className='p-5'>
      <form onSubmit={handleSubmit}>
        <div className='text-sm text-justify mb-6'>Prezado (a) Associado(a), o presente questionário tem como objetivo agilizar o processo
          de renovação de matrícula do aluno para o ano letivo de 2024. Inicialmente, cumpre informar que a renovação da matrícula será realizada totalmente
          de forma online.</div>
        <div className="relative z-0 mb-6 w-full group">
          <input value={rematricula.matricula.nome} type="name" name="nome" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " disabled />
          <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nome do aluno</label>
        </div>

        <div className="relative z-0 mb-7 w-full group">
          <input value={GetPretendida(rematricula)} type="text" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " disabled />
          <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Série pretendida para 2024</label>
        </div>

        {rematricula.matricula.aceite_matricula == 0 ?
          <div onChange={onAceiteMatriculaValueChange}>
            <div className='mb-2'>Deseja realizar a rematrícula para o ano de 2024 ?</div>
            <fieldset className='flex gap-10 mb-5' >
              <div className="flex items-center mb-4" >
                <input required id="country-option-1" type="radio" name="countries" defaultValue="1" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="country-option-1" className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Sim
                </label>
              </div>
              <div className="flex items-center mb-4">
                <input id="country-option-2" type="radio" name="countries" defaultValue="2" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="country-option-2" className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Não
                </label>
              </div>
            </fieldset>
          </div> :

          <div className='mb-6 text-sm'>Aceite de matricula dado pelo usuário {rematricula.matricula.user_aceite_matricula} {rematricula.matricula.ip_aceite_matricula} em {rematricula.matricula.date_aceite_matricula}.</div>}

        {IsEducacaoInfantil(rematricula) && rematricula.matricula.regime == null ?
          <div onChange={onIntegralValueChange}>
            <div className='mb-2'>Horários disponíveis: </div>
            <fieldset className='flex gap-10 mb-5'>
              <div className="flex items-center mb-4">
                <input required id="country-option-3" type="radio" defaultValue='Integral' name="integral" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="country-option-1" className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Integral
                </label>
              </div>
              <div className="flex items-center mb-4">
                <input id="country-option-4" type="radio" defaultValue='Parcial (manhã)' name="integral" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="country-option-2" className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Parcial (manhã)
                </label>
              </div>
              <div className="flex items-center mb-4">
                <input id="country-option-4" type="radio" defaultValue='Parcial (tarde)' name="integral" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="country-option-2" className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Parcial (tarde)
                </label>
              </div>
            </fieldset>
          </div> : ''}

        {(rematricula.matricula.parcelamento_cota == 0 && IsRespFinan(rematricula) && IsEntranteDeSegmento(rematricula)) ?
          <div className='mb-5' onChange={onParcelamentoValueChange}>
            <label required htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Escolha uma das opções de parcelamento da cota-parte</label>
            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

              <option value="1">1x</option>
              <option value="2">2x</option>
              <option value="3">3x</option>
              <option value="4">4x</option>
              <option value="5">5x</option>
              <option value="6">6x</option>
              <option value="7">7x</option>
              <option value="8">8x</option>
              <option value="9">9x</option>
              <option value="10">10x</option>
              <option value="11">11x</option>
              <option value="12">12x</option>
              <option value="13">13x</option>
              <option value="14">14x</option>
              <option value="15">15x</option>
              <option value="16">16x</option>
              <option value="17">17x</option>
              <option value="18">18x</option>
              <option value="19">19x</option>
              <option value="20">20x</option>
              <option value="21">21x</option>
              <option value="22">22x</option>
              <option value="23">23x</option>
              <option value="24">24x</option>
              <option value="25">25x</option>
              <option value="26">26x</option>
              <option value="27">27x</option>
              <option value="28">28x</option>
              <option value="29">29x</option>
              <option value="30">30x</option>
              <option value="31">31x</option>
              <option value="32">32x</option>
              <option value="33">33x</option>
              <option value="34">34x</option>
              <option value="35">35x</option>
              <option value="36">36x</option>

            </select>
          </div>
          : ''}

        <div className='flex justify-center'><PDFIcon link={link}/></div>

        {rematricula.aceite_contrato == 0 ?
          <div onChange={onAceiteContratoValueChange}>
            <fieldset>
              <div className="flex items-center mb-4">
                <input required id="checkbox-1" type="checkbox" defaultValue className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="checkbox-1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Concordo com os termos do <a href={link} target='_blank' rel='noreferrer' className="text-blue-600 hover:underline dark:text-blue-500">contrato de prestação de serviços educacionais</a>.</label>
              </div>

            </fieldset></div> :

          <div className='mb-6 text-sm'>Aceite de contrato dado em {rematricula.date_aceite_contrato} sob o IP: {rematricula.ip_aceite_contrato}.</div>}
        <div className='text-sm text-justify mb-6'>Em caso de modificação de algum dado cadastral dos responsáveis que
          assinaram o contrato para o ano de 2023, solicitamos, por gentileza, a sinalização com o
          encaminhamento dos novos dados para o e-mail: secretaria@cambauba.org.br. <div className='mt-2'>Na hipótese de dúvidas, estaremos à disposição para esclarecimentos através do e-mail: matriculas2024@cambauba.org.br</div></div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Enviar</button>
      </form>
    </div>
  )
}
