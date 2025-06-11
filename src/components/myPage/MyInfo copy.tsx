const MyInfo = () => {
  return (
    <div className="border-b">
      <em>회원 정보</em>
    </div>



<div id="personInfo">
<table className="person-tb">
  <tbody>
    <tr>
      <th><label htmlFor="hname" className="head-cell"><span className="empha">*</span>이름</label></th>
      <td>
        <input type="text" className="hname" id="hname" value="박수지" class="MS_input_txt normal-input" size="15" maxlength="30" />
      </td>
    </tr>

    <tr>
      <th><label htmlFor="id" classclassName="head-cell"><span className="empha">*</span>아이디</label></th>
      <td>
        <span>suzy2020</span>
        <input type="hidden" className="id" id="id" value="suzy2020" />
      </td>
    </tr>

    <tr>
      <th><label htmlFor="password1" class="head-cell"><span class="empha">*</span>비밀번호</label></th>
      <td>
        <input type="password" className="password1" id="password1" class="MS_input_txt normal-input" size="15" maxlength="20" onkeyup="check_pwd_length(this, 'password');" />
        <span class="idpw-info">
          * 영문 대소문자/숫자/특수문자를 혼용하여 2종류 10~16자 또는 3종류 8~16자
        </span>
      </td>
    </tr>

    <tr>
      <th><label htmlFor="password2" class="head-cell"><span class="empha">*</span>비밀번호 확인</label></th>
      <td>
        <input type="password" className="password2" id="password2"  />
      </td>
    </tr>

    <tr>
      <th><label htmlFor="birthyear" class="head-cell"><span class="empha">*</span>생년월일</label></th>
      <td>
        <select className="birthyear" class="MS_select MS_birthday">
          <option value="01">1</option>
          <option value="02">2</option>
        </select>
      </td>
    </tr>

    <tr>
      <th className="head-cell"><span className="empha">*</span>성별</th>
      <td>
        <label className="label-gender"><input type="radio" className="sex" value="-" /> 선택안함</label>
        <label className="label-gender"><input type="radio" className="sex" value="1" /> 남</label>
        <label className="label-gender"><input type="radio" className="sex" value="2" checked /> 여</label>
      </td>
    </tr>

    <tr>
      <th><label className="head-cell" htmlFor="email1"><span className="empha">*</span>이메일</label></th>
      <td>
        <input type="hidden" className="oldemail" id="oldemail" value="blne6145@daum.net" />
        <input type="hidden" className="email" id="email" value="blne6145@daum.net" />
        <input type="text" className="email1" id="email1" className="MS_input_txt MS_input_email normal-input" size="10" maxlength="20" />
        <span>@</span>
        <input type="text" className="email3" id="email3" className="MS_input_txt MS_input_email normal-input" value="daum.net" size="15" maxlength="25" />
        <select className="email2" id="email2" className="MS_select MS_email MS_input_email" onchange="viewdirect()">
          <option value="direct">직접입력</option>
          <option value="naver.com">naver.com</option>
          <option value="hotmail.com">hotmail.com</option>
          <option value="gmail.com">gmail.com</option>
        </select>
        <a href="javascript:emailcheck('Y', 'N');" className="cbtn form">이메일 중복확인</a>
      </td>
    </tr>

    <tr>
      <th><label class="head-cell">휴대폰</label></th>
      <td>
        <select className="etcphone1" id="etcphone1" class="MS_select MS_tel">
          <option value="">선택</option>
          <option value="010">010</option>
          <option value="011">011</option>
        </select>
        -
        <input type="text" className="etcphone2" id="etcphone2" class="MS_input_tel MS_tel normal-input" size="4" maxlength="4" />
        -
        <input type="text" className="etcphone3" id="etcphone3" class="MS_input_tel MS_tel normal-input" size="4" maxlength="4" />
      </td>
    </tr>

    {/* <tr>
      <th><label class="head-cell">뉴스메일</label></th>
      <td>
        <label><input type="radio" className="emailreceive" value="Y" /> 받습니다.</label>
        <label><input type="radio" className="emailreceive" value="N" checked /> 받지 않습니다.</label>
      </td>
    </tr>

    <tr>
      <th><label class="head-cell">SMS안내</label></th>
      <td>
        <label><input type="radio" className="smsreceive" value="Y" /> 받습니다.</label>
        <label><input type="radio" className="smsreceive" value="N" checked /> 받지 않습니다.</label>
      </td>
    </tr> */}

    {/* <tr>
      <th><label class="head-cell">앱 Push 알림</label></th>
      <td>
        <label><input type="checkbox" className="pushreceive_info" value="Y" disabled checked /> 정보성 정보</label>
        <label><input type="checkbox" className="pushreceive_advert" value="Y" disabled checked /> 광고성 정보</label>
      </td>
    </tr> */}
  </tbody>
</table>
</div>


  );
};

export default MyInfo;
