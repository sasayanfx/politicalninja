export default function ExternalCounter() {
  return (
    <div className="mt-4">
      {/* 外部カウンターサービス - セキュリティ上の理由でdangerouslySetInnerHTMLを削除 */}
      <table className="border-0">
        <tbody>
          <tr>
            <td className="text-center">
              <a href="http://www.rays-counter.com/" target="_blank" rel="noopener noreferrer">
                <img 
                  src="http://www.rays-counter.com/d1298_f6_032/6820c4e30c953/" 
                  alt="アクセスカウンター" 
                  className="border-0"
                />
              </a>
            </td>
          </tr>
          <tr>
            <td className="text-center">
              <img src="http://www.rays-counter.com/images/counter_01.gif" alt="counter" className="border-0" />
              <img src="http://www.rays-counter.com/images/counter_02.gif" alt="counter" className="border-0" />
              <img src="http://www.rays-counter.com/images/counter_03.gif" alt="counter" className="border-0" />
              <img src="http://www.rays-counter.com/images/counter_04.gif" alt="counter" className="border-0" />
              <img src="http://www.rays-counter.com/images/counter_05.gif" alt="counter" className="border-0" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
