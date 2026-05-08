import { useEffect, useMemo, useState } from 'react'

export default function WeddingGiftSite() {
  const gifts = [
    { name: 'Café para sobreviver aos primeiros dias', value: 'R$ 20', image: '/presente-cafe.jpg' },
    { name: 'Um mês de corte de cabelo do noivo', value: 'R$ 25', image: '/presente-corte.jpg' },
    { name: 'Vale para a noiva não brigar com o noivo', value: 'R$ 30', image: '/presente-paz.jpg' },
    { name: 'Vale para o noivo ter razão por um dia', value: 'R$ 35', image: '/presente-razao.jpg' },
    { name: 'Pizza do sábado à noite', value: 'R$ 45', image: '/presente-pizza.jpg' },
    { name: 'Cinema para continuar namorando casados', value: 'R$ 80', image: '/presente-cinema.jpg' },
    { name: 'Jantar sem lavar louça', value: 'R$ 150', image: '/presente-jantar.jpg' },
    { name: 'Ajuda para a lua de mel', value: 'R$ 300', image: '/presente-luademel.jpg' },
    { name: 'Presente premium para começar o lar', value: 'R$ 500', image: '/presente-lar-premium.jpg' },
  ]

  const [reservedGifts, setReservedGifts] = useState(() => {
    if (typeof window === 'undefined') return []
    const saved = localStorage.getItem('reserved-gifts')
    return saved ? JSON.parse(saved) : []
  })

  const [filter, setFilter] = useState('todos')

  const visibleGifts = useMemo(() => {
    if (filter === 'baixo') return gifts.filter((g) => Number(g.value.replace(/[^0-9]/g, '')) <= 80)
    if (filter === 'medio') return gifts.filter((g) => {
      const v = Number(g.value.replace(/[^0-9]/g, ''))
      return v > 80 && v <= 200
    })
    if (filter === 'alto') return gifts.filter((g) => Number(g.value.replace(/[^0-9]/g, '')) > 200)
    return gifts
  }, [filter])

  const copyPix = async (giftName) => {
    await navigator.clipboard.writeText('19992532242')
    setReservedGifts((current) => {
      const updated = [...new Set([...current, giftName])]
      localStorage.setItem('reserved-gifts', JSON.stringify(updated))
      return updated
    })
    alert('Chave Pix copiada! Presente reservado neste dispositivo.')
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="rounded-[2rem] overflow-hidden shadow-xl bg-white grid md:grid-cols-2 items-center border border-slate-100">
          <div className="h-[540px]">
            <img src="/foto-casal.jpg" alt="Raíssa e José Roberto" className="w-full h-full object-cover" />
          </div>
          <div className="p-10 md:p-14">
            <p className="text-sm tracking-[0.35em] uppercase text-slate-400 mb-3">01 • 08 • 2026</p>
            <h1 className="text-5xl md:text-6xl font-semibold mb-4">Raíssa & José Roberto</h1>
            <p className="text-lg leading-relaxed text-slate-700 mb-6 italic">
              “O amor transforma dias comuns em eternidade. Estamos construindo nosso lar e ficaremos felizes em compartilhar esse começo com você.”
            </p>
            <button className="rounded-2xl px-5 py-3 border hover:shadow-sm transition-all">
              Chave Pix • 19992532242
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-6">
        <div className="flex gap-3 flex-wrap">
          <button onClick={() => setFilter('todos')} className="rounded-2xl px-4 py-2 border">Todos</button>
          <button onClick={() => setFilter('baixo')} className="rounded-2xl px-4 py-2 border">Até R$ 80</button>
          <button onClick={() => setFilter('medio')} className="rounded-2xl px-4 py-2 border">R$ 81–200</button>
          <button onClick={() => setFilter('alto')} className="rounded-2xl px-4 py-2 border">Acima de R$ 200</button>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleGifts.map((gift) => {
            const reserved = reservedGifts.includes(gift.name)
            return (
              <div key={gift.name} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1">
                <div className="rounded-2xl overflow-hidden mb-5 relative">
                  <img src={gift.image} alt={gift.name} className="w-full h-48 object-cover" />
                  {reserved && (
                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center text-lg font-semibold">
                      Indisponível
                    </div>
                  )}
                </div>

                <div className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">Presente divertido</div>
                <h3 className="text-xl font-medium min-h-[72px]">{gift.name}</h3>
                <p className="text-2xl font-semibold mt-4 mb-5">{gift.value}</p>

                {reserved ? (
                  <div className="w-full rounded-2xl py-3 font-medium border text-center bg-slate-100">Já presentearam este</div>
                ) : (
                  <button
                    onClick={() => copyPix(gift.name)}
                    className="w-full rounded-2xl py-3 font-medium border hover:bg-slate-50 transition-colors"
                  >
                    Presentear via Pix
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
