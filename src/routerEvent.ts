import { Router, Request, Response } from "express";
import { getManager } from "typeorm";
import { Event } from "./entity/Event"

const router = Router()

router.get("/", async (_, res) => {
  const eventRepository = getManager().getRepository(Event)
  await eventRepository.find({
    relations: ["musics", "musics.ministeriosInfo"],
    order: {
      ministerio: "ASC"
    }
  }).then(async event => {
    res.status(200).json(event)
  }).catch(err => res.status(400).json({ err }))
})

router.post("/", async (req: Request<any, any, Event>, res) => {
  const eventRepository = getManager().getRepository(Event)
  const event = req.body

  await eventRepository.save(event).then(newEvent => {
    return res.status(200).json(newEvent)
  }).catch(err => {
    res.status(400).json({ error: true, message: err })
  })
})

router.put("/:id", async (req: Request<{ id: number }, any, Event>, res) => {
  const eventRepository = getManager().getRepository(Event)
  await eventRepository.findOneOrFail(req.params.id, {
    relations: ["musics"]
  }).then(async event => {
    await eventRepository.save({
      ...req.body,
      id: event.id,
      musics: [...req.body.musics]
    }).then(event => {
      return res.status(200).json(event)
    }).catch(err => {
      return res.status(400).json({ error: true, message: err })
    })
  })
})

router.delete("/:id", async (req: Request<{ id: number }, any, Event>, res) => {
  const eventRepository = getManager().getRepository(Event)
  await eventRepository.findOneOrFail(req.params.id).then(async event => {
    await eventRepository.remove(event).then(event => {
      return res.status(200).json(event)
    }).catch(err => {
      return res.status(400).json({ error: true, message: err })
    })
  })
})

export default router
