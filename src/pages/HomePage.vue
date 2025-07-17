<template>
  <div>
    <!-- Hero Section -->
    <section class="py-16 md:py-24 bg-gradient-to-b from-primary/10 to-background">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-6">
          Simplify Guest Management for Your Events
        </h1>
        <p class="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          PumBook helps event organizers manage guests, track check-ins, and create seamless event experiences.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <router-link to="/signup" class="px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90">
            Get Started
          </router-link>
          <router-link to="/about" class="px-6 py-3 rounded-md bg-secondary text-secondary-foreground font-medium hover:bg-secondary/90">
            Learn More
          </router-link>
        </div>
      </div>
    </section>
    
    <!-- Features Section -->
    <section class="py-16 bg-background">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">Everything You Need for Event Management</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-card text-card-foreground rounded-lg p-6 shadow-sm border border-border">
            <div class="mb-4 p-3 bg-primary/10 rounded-full w-fit">
              <Users class="h-6 w-6 text-primary" />
            </div>
            <h3 class="text-xl font-bold mb-2">Guest Management</h3>
            <p class="text-muted-foreground">
              Create and manage guest lists with ease. Add, edit, and organize attendees for any event.
            </p>
          </div>
          
          <div class="bg-card text-card-foreground rounded-lg p-6 shadow-sm border border-border">
            <div class="mb-4 p-3 bg-primary/10 rounded-full w-fit">
              <QrCode class="h-6 w-6 text-primary" />
            </div>
            <h3 class="text-xl font-bold mb-2">Quick Check-ins</h3>
            <p class="text-muted-foreground">
              Streamline the check-in process with barcode scanning. No more long lines or paper lists.
            </p>
          </div>
          
          <div class="bg-card text-card-foreground rounded-lg p-6 shadow-sm border border-border">
            <div class="mb-4 p-3 bg-primary/10 rounded-full w-fit">
              <BarChart class="h-6 w-6 text-primary" />
            </div>
            <h3 class="text-xl font-bold mb-2">Insightful Analytics</h3>
            <p class="text-muted-foreground">
              Track attendance, analyze check-in rates, and gain valuable insights about your events.
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- How It Works Section -->
    <section class="py-16 bg-muted/30">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">How PumBook Works</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="bg-primary text-primary-foreground rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-4">
              1
            </div>
            <h3 class="text-lg font-bold mb-2">Create an Event</h3>
            <p class="text-muted-foreground">
              Set up your event with all the necessary details.
            </p>
          </div>
          
          <div class="text-center">
            <div class="bg-primary text-primary-foreground rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-4">
              2
            </div>
            <h3 class="text-lg font-bold mb-2">Add Guests</h3>
            <p class="text-muted-foreground">
              Create your guest list manually or import from CSV.
            </p>
          </div>
          
          <div class="text-center">
            <div class="bg-primary text-primary-foreground rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-4">
              3
            </div>
            <h3 class="text-lg font-bold mb-2">Send Invitations</h3>
            <p class="text-muted-foreground">
              Guests receive personalized invites with unique barcodes.
            </p>
          </div>
          
          <div class="text-center">
            <div class="bg-primary text-primary-foreground rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-4">
              4
            </div>
            <h3 class="text-lg font-bold mb-2">Check-in Guests</h3>
            <p class="text-muted-foreground">
              Scan barcodes for quick and efficient check-ins.
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Testimonials Section -->
    <section class="py-16 bg-background">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-card text-card-foreground rounded-lg p-6 shadow-sm border border-border">
            <div class="flex items-center mb-4">
              <div class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                AB
              </div>
              <div>
                <h4 class="font-bold">Alex Brown</h4>
                <p class="text-sm text-muted-foreground">Event Manager</p>
              </div>
            </div>
            <p class="text-muted-foreground">
              "PumBook has transformed how we manage our corporate events. The check-in process is now seamless and our team can focus on delivering great experiences."
            </p>
          </div>
          
          <div class="bg-card text-card-foreground rounded-lg p-6 shadow-sm border border-border">
            <div class="flex items-center mb-4">
              <div class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                SJ
              </div>
              <div>
                <h4 class="font-bold">Sarah Johnson</h4>
                <p class="text-sm text-muted-foreground">Wedding Planner</p>
              </div>
            </div>
            <p class="text-muted-foreground">
              "As a wedding planner, keeping track of guests was always a challenge. PumBook makes it easy to manage RSVPs and check-ins for all my clients."
            </p>
          </div>
          
          <div class="bg-card text-card-foreground rounded-lg p-6 shadow-sm border border-border">
            <div class="flex items-center mb-4">
              <div class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                MT
              </div>
              <div>
                <h4 class="font-bold">Michael Torres</h4>
                <p class="text-sm text-muted-foreground">Conference Organizer</p>
              </div>
            </div>
            <p class="text-muted-foreground">
              "The analytics provided by PumBook have given us valuable insights into our attendee behavior. We've improved our events based on this data."
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- CTA Section -->
    <section class="py-16 bg-primary text-primary-foreground">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-6">Ready to Simplify Your Event Management?</h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Join thousands of event organizers who trust PumBook for their guest management needs.
        </p>
        <router-link to="/signup" class="px-6 py-3 rounded-md bg-background text-foreground font-medium hover:bg-background/90">
          Get Started for Free
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Users, QrCode, BarChart } from 'lucide-vue-next';
</script>