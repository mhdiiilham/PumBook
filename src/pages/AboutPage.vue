<template>
  <div>
    <!-- Hero Section -->
    <section class="py-16 md:py-24 bg-gradient-to-b from-primary/10 to-background">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">
          About PumBook
        </h1>
        <p class="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          We're on a mission to make event management simpler and more efficient for organizers of all sizes.
        </p>
      </div>
    </section>
    
    <!-- Our Story Section -->
    <section class="py-16 bg-background">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold mb-6">Our Story</h2>
            <p class="text-muted-foreground mb-4">
              PumBook was born out of frustration with existing event management solutions. As event organizers ourselves, we found that most tools were either too complex, too expensive, or missing key features.
            </p>
            <p class="text-muted-foreground mb-4">
              In 2023, we set out to build a solution that would address the real needs of event organizers - from small independent hosts to large event companies.
            </p>
            <p class="text-muted-foreground">
              Today, PumBook helps thousands of organizers manage their events and guest lists with ease, allowing them to focus on creating memorable experiences rather than wrestling with spreadsheets or paper lists.
            </p>
          </div>
          <div class="bg-muted rounded-lg p-8">
            <img src="/placeholder.svg?height=400&width=500" alt="PumBook Team" class="rounded-lg w-full h-auto" />
          </div>
        </div>
      </div>
    </section>
    
    <!-- Our Values Section -->
    <section class="py-16 bg-muted/30">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Our Values</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-card text-card-foreground rounded-lg p-6 shadow-sm border border-border">
            <div class="mb-4 p-3 bg-primary/10 rounded-full w-fit">
              <Lightbulb class="h-6 w-6 text-primary" />
            </div>
            <h3 class="text-xl font-bold mb-2">Simplicity</h3>
            <p class="text-muted-foreground">
              We believe that powerful software doesn't have to be complicated. We focus on intuitive design and user-friendly experiences.
            </p>
          </div>
          
          <div class="bg-card text-card-foreground rounded-lg p-6 shadow-sm border border-border">
            <div class="mb-4 p-3 bg-primary/10 rounded-full w-fit">
              <Shield class="h-6 w-6 text-primary" />
            </div>
            <h3 class="text-xl font-bold mb-2">Reliability</h3>
            <p class="text-muted-foreground">
              Events are time-sensitive, and we understand that. Our platform is built to be reliable when you need it most.
            </p>
          </div>
          
          <div class="bg-card text-card-foreground rounded-lg p-6 shadow-sm border border-border">
            <div class="mb-4 p-3 bg-primary/10 rounded-full w-fit">
              <HeartHandshake class="h-6 w-6 text-primary" />
            </div>
            <h3 class="text-xl font-bold mb-2">Customer-Focused</h3>
            <p class="text-muted-foreground">
              We listen to our users and continuously improve based on their feedback. Your success is our success.
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Team Section -->
    <!-- <section class="py-16 bg-background">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="mb-4 rounded-full overflow-hidden w-32 h-32 mx-auto">
              <img src="/placeholder.svg?height=128&width=128" alt="Team Member" class="w-full h-full object-cover" />
            </div>
            <h3 class="text-xl font-bold">Jane Smith</h3>
            <p class="text-muted-foreground">CEO & Founder</p>
          </div>
          
          <div class="text-center">
            <div class="mb-4 rounded-full overflow-hidden w-32 h-32 mx-auto">
              <img src="/placeholder.svg?height=128&width=128" alt="Team Member" class="w-full h-full object-cover" />
            </div>
            <h3 class="text-xl font-bold">Ilham</h3>
            <p class="text-muted-foreground">One and only developer</p>
          </div>
          
          <div class="text-center">
            <div class="mb-4 rounded-full overflow-hidden w-32 h-32 mx-auto">
              <img src="/placeholder.svg?height=128&width=128" alt="Team Member" class="w-full h-full object-cover" />
            </div>
            <h3 class="text-xl font-bold">Oca</h3>
            <p class="text-muted-foreground">Chief of Support System</p>
          </div>
          
          <div class="text-center">
            <div class="mb-4 rounded-full overflow-hidden w-32 h-32 mx-auto">
              <img src="/placeholder.svg?height=128&width=128" alt="Team Member" class="w-full h-full object-cover" />
            </div>
            <h3 class="text-xl font-bold">Michael Chen</h3>
            <p class="text-muted-foreground">Lead Developer</p>
          </div>
        </div>
      </div>
    </section> -->
    
    <!-- Contact Section -->
    <section class="py-16 bg-muted/30">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Get in Touch</h2>
        
        <div class="max-w-2xl mx-auto bg-card text-card-foreground rounded-lg p-8 shadow-sm border border-border">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 class="text-xl font-bold mb-4">Contact Information</h3>
              <div class="space-y-4">
                <div class="flex items-start">
                  <Mail class="h-5 w-5 mr-3 mt-0.5 text-primary" />
                  <div>
                    <p class="font-medium">Email</p>
                    <p class="text-muted-foreground">support@pumbook.com</p>
                  </div>
                </div>
                <div class="flex items-start">
                  <MapPin class="h-5 w-5 mr-3 mt-0.5 text-primary" />
                  <div>
                    <p class="font-medium">Address</p>
                    <p class="text-muted-foreground">123 Event Street, Suite 456<br />San Francisco, CA 94103</p>
                  </div>
                </div>
                <div class="flex items-start">
                  <Phone class="h-5 w-5 mr-3 mt-0.5 text-primary" />
                  <div>
                    <p class="font-medium">Phone</p>
                    <p class="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 class="text-xl font-bold mb-4">Follow Us</h3>
              <p class="text-muted-foreground mb-4">
                Stay updated with our latest features and event management tips.
              </p>
              <div class="flex space-x-4">
                <a href="#" class="p-2 bg-muted rounded-full hover:bg-muted/80">
                  <Twitter class="h-5 w-5" />
                </a>
                <a href="#" class="p-2 bg-muted rounded-full hover:bg-muted/80">
                  <Facebook class="h-5 w-5" />
                </a>
                <a href="#" class="p-2 bg-muted rounded-full hover:bg-muted/80">
                  <Instagram class="h-5 w-5" />
                </a>
                <a href="#" class="p-2 bg-muted rounded-full hover:bg-muted/80">
                  <Linkedin class="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div class="border-t border-border pt-8">
            <h3 class="text-xl font-bold mb-4">Send Us a Message</h3>
            <form class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label for="name" class="text-sm font-medium">Name</label>
                  <input 
                    id="name" 
                    type="text" 
                    class="w-full px-3 py-2 border border-border rounded-md bg-background"
                    placeholder="Your name"
                  />
                </div>
                <div class="space-y-2">
                  <label for="email" class="text-sm font-medium">Email</label>
                  <input 
                    id="email" 
                    type="email" 
                    class="w-full px-3 py-2 border border-border rounded-md bg-background"
                    placeholder="Your email"
                  />
                </div>
              </div>
              <div class="space-y-2">
                <label for="subject" class="text-sm font-medium">Subject</label>
                <input 
                  id="subject" 
                  type="text" 
                  class="w-full px-3 py-2 border border-border rounded-md bg-background"
                  placeholder="Subject"
                />
              </div>
              <div class="space-y-2">
                <label for="message" class="text-sm font-medium">Message</label>
                <textarea 
                  id="message" 
                  rows="4" 
                  class="w-full px-3 py-2 border border-border rounded-md bg-background"
                  placeholder="Your message"
                ></textarea>
              </div>
              <button 
                type="submit" 
                class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { 
  Lightbulb, 
  Shield, 
  HeartHandshake, 
  Mail, 
  MapPin, 
  Phone, 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin 
} from 'lucide-vue-next';
</script>