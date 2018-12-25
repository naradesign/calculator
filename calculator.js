const calculator = () => {
  const $input = document.getElementById('input')
  const $output = document.getElementById('output')

  const toValidStr = (valueArr) => { // 사용자 입력 문자 중 유효한 문자만 리턴
    let validArr = [] // 유효한 문자 배열

    for (let i = 0; i < valueArr.length; i++) { // 배열 순환
      if (/[0-9]|\.|\(|\)|\+|-|\*|\//.test(valueArr[i])) { // 허용 문자를
        validArr.push(valueArr[i]) // 새 배열에
      }
    }

    return validArr.join('')
  }

  const isValidExpression = (valueArr, validStr) => {
    let parenthesesArr = [] // 괄호 문자 배열

    for (let i = 0; i < valueArr.length; i++) { // 문자 배열 순환
      if (/\(|\)/.test(valueArr[i])) { // 괄호만
        parenthesesArr.push(valueArr[i]) // 새 배열에
      }
    }

    const parenthesesStr = parenthesesArr.join('') // 괄호 문자열

    if (parenthesesStr.length % 2) { // 홀수라면
      return false
    } else if (/^\)|\($/.test(parenthesesStr)) { // ')'으로 시작하거나 '('으로 끝나면
      return false
    }

    let testStr = parenthesesStr // 괄호 문자열을 테스트 변수에 할당

    for (let i = 0; i < parenthesesStr.length / 2; i++) {
      testStr = testStr.replace(/\(\)/, '') // 괄호 쌍을 제거
    }

    if (testStr.length) { // 찌꺼기 ')('가 남으면
      return false
    }

    if (/(\+|-|\*|\/)$|(\+|-|\*|\/)\)|\(\.?\)|\)(\d|\.)|(\d|\.)\(/.test(validStr)) { // 잘못된 사칙연산이면
      return false
    }

    return true
  }

  $input.addEventListener('keyup', () => {
    const valueArr = $input.value.split('') // 배열에 한 글자씩 담아서
    const validStr = toValidStr(valueArr)
    let result

    $input.value = validStr // 유효한 문자만 표시

    if (isValidExpression(valueArr, validStr)) { // 수식 및 괄호 유효성 검사
      // result = eval(validStr)

      if (result === undefined) {
        result = 'Type your expression!'
      }

      $output.innerText = result
    }
  })
}

calculator()
